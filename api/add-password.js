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

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: '只支持POST请求' 
    });
  }

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
};