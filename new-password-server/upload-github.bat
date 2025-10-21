@echo off
echo Preparing to upload code to GitHub...
echo.

REM Check if in correct directory
if not exist "package.json" (
    echo Error: Please make sure you are in the new-password-server directory
    pause
    exit /b 1
)

echo Step 1: Initialize Git repository (if not already initialized)
if not exist ".git" (
    git init
    git remote add origin https://github.com/huangtianrun333-code/password-server-new.git
)

echo.
echo Step 2: Add all files to staging area
git add .

echo.
echo Step 3: Commit changes
git commit -m "Fix Vercel build configuration: add explicit cache rules and package-lock.json"

echo.
echo Step 4: Push to GitHub
git push -u origin main

echo.
echo Upload completed! Check GitHub repository: https://github.com/huangtianrun333-code/password-server-new
pause