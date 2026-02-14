pipeline {
    agent any

    stages {

        stage('Stop Old Container') {
            steps {
                sh 'docker stop happy-container || true'
                sh 'docker rm happy-container || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t happy-image .'
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name happy-container happy-image'
            }
        }
    }
}
