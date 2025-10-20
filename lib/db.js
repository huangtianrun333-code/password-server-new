import { MongoClient } from 'mongodb';

// MongoDB连接配置
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/password-db';
const MONGODB_DB = 'password-db';

// 连接缓存
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(MONGODB_DB);

    // 创建索引
    await db.collection('passwords').createIndex({ password: 1 }, { unique: true });
    await db.collection('passwords').createIndex({ expiry_time: 1 });

    cachedClient = client;
    cachedDb = db;

    console.log('MongoDB连接成功');
    return db;

  } catch (error) {
    console.error('MongoDB连接失败:', error);
    throw error;
  }
}

export { connectToDatabase };