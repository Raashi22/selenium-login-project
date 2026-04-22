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

        
        stage('Start Server') {
    steps {
        sh '''
        nohup node server.js > server.log 2>&1 &
        sleep 5
        '''
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
        sh '''
        docker stop selenium-container || true
        docker rm selenium-container || true
        docker run -d -p 3000:3000 --name selenium-container selenium-app
        '''
    }
}
    }
}