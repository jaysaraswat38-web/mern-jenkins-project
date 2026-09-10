pipeline {
    agent any

    environment {
        FRONTEND_DIR = '/var/www/mern-deploy'
        BACKEND_DIR  = '/opt/mern-deploy/server'
        SERVICE_NAME = 'mern-deploy'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'node --check server.js'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sh 'sudo mkdir -p "$BACKEND_DIR"'
                sh 'sudo cp -r backend/* "$BACKEND_DIR"/'
                sh 'sudo chown -R jenkins:jenkins "$BACKEND_DIR"'
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh 'sudo mkdir -p "$FRONTEND_DIR"'
                sh 'sudo rm -rf "$FRONTEND_DIR"/*'
                sh 'sudo cp -r frontend/dist/* "$FRONTEND_DIR"/'
                sh 'sudo chown -R www-data:www-data "$FRONTEND_DIR"'
            }
        }

        stage('Restart Backend') {
            steps {
                sh 'sudo systemctl daemon-reload'
                sh 'sudo systemctl restart "$SERVICE_NAME"'
                sh 'sudo systemctl status "$SERVICE_NAME" --no-pager'
            }
        }

        stage('Verify') {
            steps {
                sh 'curl -f http://127.0.0.1:5000/api/health'
            }
        }
    }

    post {
        always {
            echo 'MERN deployment pipeline finished.'
        }
    }
}
