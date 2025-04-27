echo "Switchig to branch master"
git checkout main

echo "Building the project"
npm run build

echo "Deploying files to server"
scp -r dist/* lubab@173.249.10.44:/var/www/173.249.10.44

echo "Done..."