import { MongoClient } from 'mongodb';

// MongoDB连接配置 - 使用环境变量，如果没有配置则使用内存模拟
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = 'password-db';

// 内存模拟数据库（用于测试）
let memoryDb = {
  passwords: new Map(),
  activatedPasswords: new Map()
};

async function connectToDatabase() {
  // 如果没有配置MongoDB URI，使用内存数据库
  if (!MONGODB_URI) {
    console.log('使用内存数据库（测试模式）');
    return {
      collection: (name) => {
        return {
          findOne: async (query) => {
            if (name === 'passwords') {
              return memoryDb.passwords.get(query.password) || null;
            }
            return null;
          },
          insertOne: async (doc) => {
            if (name === 'passwords') {
              memoryDb.passwords.set(doc.password, doc);
              return { acknowledged: true };
            }
            return { acknowledged: false };
          },
          updateOne: async (filter, update) => {
            if (name === 'passwords' && filter.password) {
              const existing = memoryDb.passwords.get(filter.password);
              if (existing) {
                Object.assign(existing, update.$set);
                return { acknowledged: true };
              }
            }
            return { acknowledged: false };
          }
        };
      }
    };
  }

  // 使用真实的MongoDB
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(MONGODB_DB);

    // 创建索引
    await db.collection('passwords').createIndex({ password: 1 }, { unique: true });
    await db.collection('passwords').createIndex({ expiry_time: 1 });

    console.log('MongoDB连接成功');
    return db;

  } catch (error) {
    console.error('MongoDB连接失败:', error);
    throw error;
  }
}

export { connectToDatabase };