#!/bin/bash

source deploy-secrets.sh

echo "======================================"
echo "🚀 AntTrack Deploy Starting..."
echo "======================================"

echo ""
echo "📦 Step 1 - Building Java..."
mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Maven failed! Stopping."
    exit 1
fi
echo "✅ Maven done!"

echo ""
echo "🐳 Step 2 - Building Docker image..."
docker build -t ant-track-api .
if [ $? -ne 0 ]; then
    echo "❌ Docker build failed! Stopping."
    exit 1
fi
echo "✅ Docker image built!"

echo ""
echo "🔐 Step 3 - Logging into ECR..."
aws ecr get-login-password --region us-east-1 | docker login \
    --username AWS \
    --password-stdin 169802850437.dkr.ecr.us-east-1.amazonaws.com
if [ $? -ne 0 ]; then
    echo "❌ ECR login failed! Stopping."
    exit 1
fi
echo "✅ ECR login successful!"

echo ""
echo "⬆️  Step 4 - Pushing image to ECR..."
docker tag ant-track-api:latest $ECR
docker push $ECR
echo "✅ Image pushed!"

echo ""
echo "🖥️  Step 5 - Deploying on EC2..."
ssh -i "$PEM" -o StrictHostKeyChecking=no ec2-user@$EC2 << ENDSSH

    echo "🔐 Logging into ECR from EC2..."
    aws ecr get-login-password --region us-east-1 | docker login \
        --username AWS \
        --password-stdin 169802850437.dkr.ecr.us-east-1.amazonaws.com

    echo "📥 Pulling new image..."
    docker pull $ECR

    echo "🛑 Stopping old container..."
    docker stop ant-track-api || true
    docker rm ant-track-api || true

    echo "▶️  Starting new container..."
    docker run -d \
        --name ant-track-api \
        --restart always \
        -p 8080:8080 \
        -e SPRING_DATASOURCE_URL=$DB_URL \
        -e SPRING_DATASOURCE_USERNAME=$DB_USERNAME \
        -e SPRING_DATASOURCE_PASSWORD=$DB_PASSWORD \
        -e ALLOWED_ORIGINS=$ALLOWED_ORIGINS \
        $ECR

    echo "⏳ Waiting for app to start..."
    sleep 8

    echo "🔍 Verifying..."
    curl -s http://localhost:8080/anttrackapi/v1/gastos | head -c 200

ENDSSH

echo ""
echo "======================================"
echo "✅ Deploy complete!"
echo "🌐 http://$EC2:8080/anttrackapi/v1/gastos"
echo "======================================"