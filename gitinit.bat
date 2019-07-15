set /p URL=Enter remote repository URL:
git init
git add .
git commit -m "Initialize"
git remote add origin %URL%
git remote -v
git push origin master --force