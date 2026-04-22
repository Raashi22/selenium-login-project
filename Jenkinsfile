pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t selenium-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 selenium-app'
            }
        }
    }
}