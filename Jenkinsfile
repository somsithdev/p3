pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('ac38cece-176b-41a1-a1b2-df53421c866f')
	}

	stages {

		stage('Build') {

			steps {
				sh 'docker build -t somsithdev/shopping-frontend-image:latest .'
			}
		}

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push somsithdev/shopping-frontend-image:latest'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}
