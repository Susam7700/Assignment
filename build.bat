REM Step 1: Install dependencies
echo Installing dependencies...
npm install

REM Step 2: Run tests
echo Running tests...
npm test

REM Step 3: Create a deployable package
echo Building the application...
npm run build

REM Step 4: Create a deployable .zip package
echo Packaging the application...
zip -r deploy-package.zip .

REM Step 5: Final message
echo Build completed. Deployable package created: deploy-package.zip
