#!/bin/bash

# Variables
S3_BUCKET="brightminds-deployments"

# Step 1: Build the frontend
echo "Building the frontend..."
npm run build

# Step 2: Upload to S3
echo "Uploading files to S3..."
aws s3 sync dist/ s3://$S3_BUCKET/ --delete

# Step 3: Enable static website hosting
echo "Enabling static website hosting..."
aws s3 website s3://$S3_BUCKET/ --index-document index.html --error-document index.html

echo "Deployment completed successfully!"