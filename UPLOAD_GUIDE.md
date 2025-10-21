# GitHub 代码上传指南

## 前提条件
- 已安装 Git 并配置到系统 PATH
- 已登录 GitHub 账户
- 有权限访问仓库：https://github.com/huangtianrun333-code/password-server-new

## 手动上传步骤

### 方法一：使用 Git 命令行

1. **打开命令提示符或 PowerShell**
   - 按 `Win + R`，输入 `cmd` 或 `powershell`

2. **导航到项目目录**
   ```cmd
   cd "C:\Users\xuwan\Desktop\yings12\new-password-server"
   ```

3. **初始化 Git 仓库（如果尚未初始化）**
   ```cmd
   git init
   git remote add origin https://github.com/huangtianrun333-code/password-server-new.git
   ```

4. **添加所有文件到暂存区**
   ```cmd
   git add .
   ```

5. **提交更改**
   ```cmd
   git commit -m "修复Vercel构建配置：添加明确的缓存规则和package-lock.json"
   ```

6. **推送到 GitHub**
   ```cmd
   git push -u origin main
   ```

### 方法二：使用批处理脚本

1. **双击运行上传脚本**
   - 在文件资源管理器中找到 `upload-to-github.bat`
   - 双击运行

2. **按照脚本提示操作**
   - 脚本会自动执行所有 Git 命令

## 上传的文件内容

### 修复内容总结

1. **Vercel 配置修复** (`vercel.json`)
   - 添加了明确的 API 端点配置
   - 移除了冲突的构建配置
   - 使用标准的 Vercel Node.js 配置

2. **依赖管理** (`package-lock.json`)
   - 创建了依赖锁定文件
   - 确保 Vercel 能正确识别依赖缓存

3. **模块语法统一**
   - 所有 JavaScript 文件使用 ES 模块语法
   - 确保与 Vercel 的兼容性

### 项目结构
```
new-password-server/
├── api/
│   ├── password.js          # 密码验证 API
│   └── add-password.js      # 添加密码 API
├── lib/
│   └── db.js               # 数据库连接模块
├── server.js               # Express 服务器主文件
├── index.html              # 状态页面
├── package.json            # 项目配置
├── package-lock.json       # 依赖锁定文件
├── vercel.json             # Vercel 部署配置
└── upload-to-github.bat    # 上传脚本
```

## 上传后操作

1. **检查 GitHub 仓库**
   - 访问：https://github.com/huangtianrun333-code/password-server-new
   - 确认所有文件已成功上传

2. **在 Vercel 重新部署**
   - 进入 Vercel 控制台
   - 选择项目 `password-server-new`
   - 点击 "重新部署"

3. **验证部署结果**
   - 检查构建日志是否显示正常构建时间（> 1秒）
   - 测试 API 端点是否正常工作

## 常见问题

### Q: Git 命令不可用
A: 请确保 Git 已正确安装并添加到系统 PATH

### Q: 权限被拒绝
A: 请确保有权限访问 GitHub 仓库，或使用个人访问令牌

### Q: 上传失败
A: 可以尝试强制推送：`git push -f origin main`

## 联系支持

如果遇到问题，请检查：
- Git 安装状态
- 网络连接
- GitHub 仓库权限