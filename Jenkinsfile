
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    environment {
        DOCKER_IMAGE = 'joshithachilukuri/food-order-management:v1'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/joshi440/FoodOrderManagement.git'
            }
        }

        stage('Checkout') {
            steps {
                bat 'dir'
                bat 'git rev-parse --short HEAD'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_TOKEN'
                )]) {
                    bat 'echo %DOCKER_TOKEN% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                bat 'docker push %DOCKER_IMAGE%'
            }
        }

        stage('Verify Kubernetes Access') {
            steps {
                bat 'kubectl get nodes'
            }
        }

        stage('Deploy FoodOrderManagement') {
            steps {
                bat 'kubectl apply -f deployment.yaml'
                bat 'kubectl apply -f service.yaml'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'kubectl rollout status deployment/food-order-deployment --timeout=120s'
                bat 'kubectl get pods'
                bat 'kubectl get service food-order-service'
            }
        }
    }

    post {
        success {
            echo 'FoodOrderManagement Kubernetes deployment completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check the Console Output.'
        }

        always {
            echo 'Pipeline execution finished.'
        }
    }
}
