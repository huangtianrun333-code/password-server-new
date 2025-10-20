@echo off
echo 正在准备上传代码到GitHub...
echo.

REM 检查是否在正确的目录
if not exist "package.json" (
    echo 错误：请确保在new-password-server目录下运行此脚本
    pause
    exit /b 1
)

echo 步骤1：初始化Git仓库（如果尚未初始化）
if not exist ".git" (
    git init
    git remote add origin https://github.com/huangtianrun333-code/password-server-new.git
)

echo.
echo 步骤2：添加所有文件到暂存区
git add .

echo.
echo 步骤3：提交更改
git commit -m "修复Vercel构建配置：添加明确的缓存规则和package-lock.json"

echo.
echo 步骤4：推送到GitHub
git push -u origin main

echo.
echo 上传完成！请检查GitHub仓库：https://github.com/huangtianrun333-code/password-server-new
pause