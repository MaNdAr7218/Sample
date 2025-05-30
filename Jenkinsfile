pipeline {
    agent any

    environment {
        DOCKER_HOST_IP = "65.0.214.68"
        DOCKER_USER = "ubuntu"
        DOCKER_APP_DIR = "story-generator"
        REPO_URL = "https://github.com/MaNdAr7218/Sample.git"
        IMAGE_NAME = "story-gen-app"
        CONTAINER_NAME = "story-gen-container"
        PORT = "3000"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Transfer to EC2') {
            steps {
                sh """
                echo "Transferring code to EC2..."
                scp -o StrictHostKeyChecking=no -r . ${DOCKER_USER}@${DOCKER_HOST_IP}:${DOCKER_APP_DIR}
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                echo "Building Docker image on EC2..."
                ssh -o StrictHostKeyChecking=no ${DOCKER_USER}@${DOCKER_HOST_IP} '
                    cd ${DOCKER_APP_DIR} &&
                    docker build -t ${IMAGE_NAME} .
                '
                """
            }
        }

        stage('Run Container') {
            steps {
                sh """
                echo "Running container on EC2..."
                ssh ${DOCKER_USER}@${DOCKER_HOST_IP} '
                    docker rm -f ${CONTAINER_NAME} || true &&
                    docker run -d -p ${PORT}:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}
                '
                """
            }
        }

        stage('Selenium Tests') {
            steps {
                sh """
                echo "Running Selenium tests..."
                # Add your Selenium test command here
                # Example: python3 selenium_test.py --url=http://${DOCKER_HOST_IP}:${PORT}
                """
            }
        }
    }
}

