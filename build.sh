#!/bin/bash

# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Run tests
echo "Running tests..."
npm test

# Step 3: Create a deployable package
echo "Building the application..."
npm run build

# Step 4: Create a deployable .zip package
echo "Packaging the application..."
zip -r deploy-package.zip .

# Step 5: Final message
echo "Build completed. Deployable package created: deploy-package.zip"
