# GitHub仓库上传指南

## 方法一：手动上传（推荐）

### 1. 创建GitHub仓库

1. 访问 [GitHub.com](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `password-server-new`
   - **Description**: 跨设备密码同步服务器
   - **Public** (公开仓库)
   - **不要**勾选 "Add a README file"
4. 点击 "Create repository"

### 2. 手动上传文件

在GitHub仓库页面：

1. 点击 "Add file" → "Upload files"
2. 将 `new-password-server` 文件夹中的所有文件拖拽到上传区域
3. 填写提交信息："Initial commit: New password server"
4. 点击 "Commit changes"

## 方法二：使用Git命令行（如果安装了Git）

```bash
# 进入项目目录
cd new-password-server

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: New password server"

# 添加远程仓库
git remote add origin https://github.com/your-username/password-server-new.git

# 推送代码
git branch -M main
git push -u origin main
```

## 方法三：使用GitHub Desktop

1. 下载并安装 [GitHub Desktop](https://desktop.github.com)
2. 打开GitHub Desktop
3. 点击 "File" → "Add Local Repository"
4. 选择 `new-password-server` 文件夹
5. 填写提交信息并发布到GitHub

## 上传完成后

仓库地址将类似：`https://github.com/your-username/password-server-new`

## 部署到Vercel

1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入GitHub仓库 `password-server-new`
4. 配置环境变量：
   - `MONGODB_URI`: 您的MongoDB连接字符串
5. 点击 "Deploy"

## 获取新服务器地址

部署完成后，Vercel会提供类似这样的域名：
- `https://password-server-new.vercel.app`

## 更新Android应用

修改Android应用中的服务器地址：

在 `PasswordService.java` 中：
```java
private static final String BASE_URL = "https://password-server-new.vercel.app/api";
```

## 技术支持

如果遇到上传问题：
1. 确保GitHub账户已登录
2. 检查网络连接
3. 确认仓库名称没有重复

上传完成后，您就可以按照 `DEPLOYMENT.md` 中的步骤进行部署了！