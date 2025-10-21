// 主服务器入口文件 - 混淆版本
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 混淆的常量定义
const _0x1a2b3c = ['running', '密码服务器运行正常'];
const _0x4d5e6f = ['huangtianrun1', 'huangtianrun'];
const _0x7a8b9c = ['管理员登录成功', '永久用户登录成功'];

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查端点
app.get('/', (req, res) => {
  res.json({ 
    status: _0x1a2b3c[0], 
    message: _0x1a2b3c[1],
    timestamp: new Date().toISOString()
  });
});

// 密码验证端点 - 混淆版本
app.post('/api/password', async (req, res) => {
  try {
    const { password, deviceId } = req.body;
    
    if (!password) {
      return res.status(400).json({ 
        valid: false, 
        message: getErrorMessage(0) 
      });
    }

    // 连接数据库
    const db = await connectToDatabase();
    const passwordsCollection = db.collection('passwords');

    // 混淆的密码验证逻辑
    const adminCheck = _0x4d5e6f[0] === password;
    const permanentCheck = _0x4d5e6f[1] === password;

    if (adminCheck) {
      return res.json({ 
        valid: true, 
        message: _0x7a8b9c[0],
        expiry_time: 0
      });
    }

    if (permanentCheck) {
      return res.json({ 
        valid: true, 
        message: _0x7a8b9c[1],
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
          message: getErrorMessage(1) 
        });
      }
    } else {
      // 密码不存在
      return res.json({ 
        valid: false, 
        message: getErrorMessage(2) 
      });
    }

  } catch (error) {
    console.error('密码验证错误:', error);
    return res.status(500).json({ 
      valid: false, 
      message: getErrorMessage(3) 
    });
  }
});

// 混淆的错误消息获取函数
function getErrorMessage(type) {
  const errors = [
    '密码不能为空',
    '密码已过期',
    '无效的密码',
    '服务器内部错误'
  ];
  return errors[type] || '未知错误';
}

// 添加密码端点
app.post('/api/add-password', async (req, res) => {
  try {
    const { password, type } = req.body;
    
    if (!password || !type) {
      return res.status(400).json({ 
        success: false, 
        message: '密码和类型不能为空' 
      });
    }

    // 验证密码格式
    if (password.length < 6) {
      return res.json({ 
        success: false, 
        message: '密码长度至少6位' 
      });
    }

    // 验证类型有效性
    const validTypes = [1, 7, 30];
    if (!validTypes.includes(type)) {
      return res.json({ 
        success: false, 
        message: '无效的密码类型，请选择1、7或30' 
      });
    }

    // 连接数据库
    const db = await connectToDatabase();
    const passwordsCollection = db.collection('passwords');

    // 检查密码是否已存在
    const existingPassword = await passwordsCollection.findOne({ password });
    if (existingPassword) {
      return res.json({ 
        success: false, 
        message: '密码已存在' 
      });
    }

    // 计算过期时间
    const currentTime = Date.now();
    const expiryTime = currentTime + (type * 24 * 60 * 60 * 1000);

    // 插入新密码
    const result = await passwordsCollection.insertOne({
      password,
      type,
      created_at: currentTime,
      expiry_time: expiryTime,
      used_devices: [],
      last_used: null
    });

    if (result.acknowledged) {
      return res.json({ 
        success: true, 
        message: `密码添加成功，有效期${type}天`,
        expiry_time: expiryTime
      });
    } else {
      return res.json({ 
        success: false, 
        message: '密码添加失败' 
      });
    }

  } catch (error) {
    console.error('添加密码错误:', error);
    return res.status(500).json({ 
      success: false, 
      message: '服务器内部错误' 
    });
  }
});

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

// 启动服务器
app.listen(PORT, () => {
  console.log(`密码服务器运行在端口 ${PORT}`);
});

export default app;