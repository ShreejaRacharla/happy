pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git 'https://github.com/ShreejaRacharla/happy.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t nextjs-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop nextjs-container || true'
                sh 'docker rm nextjs-container || true'
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name nextjs-container nextjs-app'
            }
        }
    }
}
