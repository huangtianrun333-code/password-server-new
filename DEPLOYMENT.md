# 全新密码服务器部署指南

## 1. 创建GitHub仓库

1. 在GitHub上创建新仓库：`password-server-new`
2. 将本地代码推送到仓库：

```bash
cd new-password-server
git init
git add .
git commit -m "Initial commit: New password server"
git branch -M main
git remote add origin https://github.com/your-username/password-server-new.git
git push -u origin main
```

## 2. 部署到Vercel

1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入GitHub仓库 `password-server-new`
4. 配置环境变量：
   - `MONGODB_URI`: 您的MongoDB连接字符串
5. 点击 "Deploy"

## 3. 获取新服务器地址

部署完成后，Vercel会提供类似这样的域名：
- `https://password-server-new.vercel.app`
- 或者自定义域名

## 4. 更新Android应用

修改Android应用中的服务器地址：

在 <mcfile name="PasswordService.java" path="c:\Users\xuwan\Desktop\yings12\app\src\main\java\com\example\dialermapper\PasswordService.java"></mcfile> 中：

```java
private static final String BASE_URL = "https://password-server-new.vercel.app/api";
```

## 5. 测试服务器

### 测试密码验证API
```bash
curl -X POST https://password-server-new.vercel.app/api/password \
  -H "Content-Type: application/json" \
  -d '{"password":"test123","deviceId":"test-device"}'
```

### 测试添加密码API
```bash
curl -X POST https://password-server-new.vercel.app/api/add-password \
  -H "Content-Type: application/json" \
  -d '{"password":"newpass123","type":7}'
```

## 6. 构建和测试Android应用

```bash
cd c:\Users\xuwan\Desktop\yings12
.\gradlew.bat assembleDebug
```

## 故障排除

### 常见问题

1. **连接失败**：检查MongoDB连接字符串是否正确
2. **API返回404**：确认Vercel项目配置正确
3. **CORS错误**：API已配置CORS头，无需额外配置

### 环境变量配置

确保在Vercel中配置以下环境变量：
- `MONGODB_URI`: MongoDB Atlas连接字符串
- `NODE_ENV`: production

## 技术支持

如果遇到问题，请检查：
1. Vercel部署日志
2. MongoDB连接状态
3. API端点URL是否正确