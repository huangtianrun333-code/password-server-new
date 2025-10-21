# 跨设备密码同步服务器

这是一个全新的密码同步服务器，支持Android应用跨设备密码管理。

## 功能特性

- ✅ 密码验证API
- ✅ 密码添加API  
- ✅ MongoDB数据库支持
- ✅ Vercel无服务器部署
- ✅ 跨设备同步

## 快速开始

### 1. 环境配置

复制环境变量文件：
```bash
cp .env.example .env.local
```

配置MongoDB连接字符串：
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/password-db
```

### 2. 本地开发

```bash
npm install
npm run dev
```

### 3. 部署到Vercel

1. 连接GitHub仓库到Vercel
2. 配置环境变量
3. 自动部署

## API文档

### 验证密码

**端点：** `POST /api/password`

**请求体：**
```json
{
  "password": "用户密码",
  "deviceId": "设备ID"
}
```

**响应：**
```json
{
  "valid": true,
  "message": "验证成功消息",
  "expiry_time": 1234567890
}
```

### 添加密码

**端点：** `POST /api/add-password`

**请求体：**
```json
{
  "password": "新密码",
  "type": 1
}
```

**类型说明：**
- 1: 1天有效期
- 7: 7天有效期  
- 30: 30天有效期

## 技术支持

如有问题，请查看详细部署文档或联系开发者。