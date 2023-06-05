pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('ac38cece-176b-41a1-a1b2-df53421c866f')
	}

	stages {
	    
	    stage('gitclone') {

			steps {
				checkout([$class: 'GitSCM',
                          branches: [[name: 'main']],
                          doGenerateSubmoduleConfigurations: false,
                          extensions: [],
                          submoduleCfg: [],
                          userRemoteConfigs: [[credentialsId: 'ccd3b51c-da26-49b1-9149-0937d00ba993', url: 'https://github.com/somsithdev/p3.git']]
                ])
			}
		}

		stage('Build') {
			dir('frontend'){
			steps {
				sh 'docker build -t somsithbook00700/shopping-frontend-image:latest .'
			}
			}
		}

		stage('Login') {
			dir('frontend'){
			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
			}
		}

		stage('Push') {
			dir('frontend'){
			steps {
				sh 'docker push somsithbook00700/shopping-frontend-image:latest'
			}
			}
		}
		stage('Deploy') {
			dir('frontend'){
			    steps {
				// Run the Docker container using the pushed image
				sh "docker run -d -p 3000:3000 somsithbook00700/shopping-frontend-image:latest"
            }
			}
        }
	}


}
