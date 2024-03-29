pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('ac38cece-176b-41a1-a1b2-df53421c866f')
    }

    stages {
        stage('gitclone') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: 'main']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [],
                    submoduleCfg: [],
                    userRemoteConfigs: [[credentialsId: 'ccd3b51c-da26-49b1-9149-0937d00ba993', url: 'https://github.com/somsithdev/p3.git']]
                ])
            }
        }

        stage('Frontend Build') {
            steps {
                script {
                    // Change working directory to 'frontend'
                    dir('frontend') {
                        sh 'docker build -t somsithbook00700/shopping-frontend-image:latest .'
                    }
                }
            }
        }
        stage('Backend Build') {
            steps {
                        sh 'docker build -t somsithbook00700/shopping-backend-image:latest .'
                }
            }

        stage('Login') {
            steps {
                script {
                    // Change working directory to 'frontend'
                    dir('frontend') {
                        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                    }
                }
            }
        }

        stage('Frontend Push') {
            steps {
                script {
                    // Change working directory to 'frontend'
                    dir('frontend') {
                        sh 'docker push somsithbook00700/shopping-frontend-image:latest'
                    }
                }
            }
        }
            stage('Backend Push') {
            steps {
                        sh 'docker push somsithbook00700/shopping-backend-image:latest'
            }
        }
        stage('Create Network') {
            steps {
                // Create the Docker network if it doesn't exist already
                script {
                    def networkExists = sh(script: 'docker network inspect shopping-network', returnStatus: true)
                    if (networkExists != 0) {
                        sh 'docker network create shopping-network'
                    }
                }
            }
        }
          stage('Backend Deploy') {
                steps {
                                // Remove the existing container with the same name
                            sh 'docker rm -f backend-container'
                            // Run the Docker container using the pushed image
                            withEnv(["DB_HOST=localhost", "DB_PORT=3306"]) {
                            sh 'docker run -d --name backend-container --network shopping-network -p 5000:5000 somsithbook00700/shopping-backend-image:latest'
                                }
                }
            }
        
        stage('Frontend Deploy') {
            steps {
                script {
                    // Change working directory to 'frontend'
                    dir('frontend') {
                        // Remove the existing container with the same name
                        sh 'docker rm -f frontend-container'
                        // Run the Docker container using the pushed image
                        sh "docker run -d --name frontend-container --network shopping-network -p 3000:3000 somsithbook00700/shopping-frontend-image:latest"
                        
                    }
                }
            }
        }
      
    }
}
