Write-Host "Preparing to upload code to GitHub..." -ForegroundColor Green
Write-Host ""

# Check if in correct directory
if (-not (Test-Path "package.json")) {
    Write-Host "Error: Please make sure you are in the new-password-server directory" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Step 1: Initialize Git repository (if not already initialized)" -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
    git remote add origin https://github.com/huangtianrun333-code/password-server-new.git
}

Write-Host ""
Write-Host "Step 2: Add all files to staging area" -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "Step 3: Commit changes" -ForegroundColor Yellow
git commit -m "Fix Vercel build configuration: add explicit cache rules and package-lock.json"

Write-Host ""
Write-Host "Step 4: Push to GitHub" -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "Upload completed! Check GitHub repository: https://github.com/huangtianrun333-code/password-server-new" -ForegroundColor Green
Read-Host "Press Enter to exit"