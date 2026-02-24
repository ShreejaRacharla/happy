pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t happy-image .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop happy-container || true'
                sh 'docker rm happy-container || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name happy-container happy-image'
            }
        }
    }
}
