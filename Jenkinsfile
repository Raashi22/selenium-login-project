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

        stage('Push to Docker Hub') {
    steps {
        sh '''
        docker tag selenium-app raashii/selenium-app
        docker push raashii/selenium-app
        '''
    }
}

        stage('Run Container') {
            steps {
                sh '''
                pkill node || true
                docker stop selenium-container || true
                docker rm selenium-container || true
                docker run -d -p 3000:3000 --name selenium-container selenium-app
                '''
            }
        }
    }
}