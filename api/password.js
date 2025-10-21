import { connectToDatabase } from '../lib/db.js';

export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 支持GET请求用于健康检查
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'healthy',
      message: '服务器运行正常',
      timestamp: Date.now()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      valid: false, 
      message: '只支持POST和GET请求' 
    });
  }

  try {
    const { password, deviceId } = req.body;
    
    if (!password) {
      return res.status(400).json({ 
        valid: false, 
        message: '密码不能为空' 
      });
    }

    // 连接数据库
    const db = await connectToDatabase();
    const passwordsCollection = db.collection('passwords');

    // 检查管理员密码
    if (password === 'huangtianrun1') {
      return res.json({ 
        valid: true, 
        message: '管理员登录成功',
        expiry_time: 0
      });
    }

    // 检查永久用户密码
    if (password === 'huangtianrun') {
      return res.json({ 
        valid: true, 
        message: '永久用户登录成功',
        expiry_time: 0
      });
    }

    // 检查临时密码
    const passwordDoc = await passwordsCollection.findOne({ password });
    
    if (passwordDoc) {
      const currentTime = Date.now();
      
      if (currentTime <= passwordDoc.expiry_time) {
        // 密码有效
        const remainingTime = passwordDoc.expiry_time - currentTime;
        
        // 记录设备使用信息
        await passwordsCollection.updateOne(
          { password },
          { 
            $addToSet: { used_devices: deviceId },
            $set: { last_used: currentTime }
          }
        );

        return res.json({ 
          valid: true, 
          message: `临时密码登录成功，剩余时间：${formatRemainingTime(remainingTime)}`,
          expiry_time: passwordDoc.expiry_time
        });
      } else {
        // 密码已过期
        return res.json({ 
          valid: false, 
          message: '密码已过期' 
        });
      }
    } else {
      // 密码不存在
      return res.json({ 
        valid: false, 
        message: '无效的密码' 
      });
    }

  } catch (error) {
    console.error('密码验证错误:', error);
    return res.status(500).json({ 
      valid: false, 
      message: '服务器内部错误' 
    });
  }
};

function formatRemainingTime(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  
  if (days > 0) {
    return `${days}天${hours}小时`;
  } else if (hours > 0) {
    return `${hours}小时${minutes}分钟`;
  } else {
    return `${minutes}分钟`;
  }
}