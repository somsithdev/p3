pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('ac38cece-176b-41a1-a1b2-df53421c866f')
	}

	stages {

		stage('Frontend Build') {

			steps {
				sh 'docker build -t somsithbook00700/shopping-frontend-image:latest .'
			}
		}

		stage('Frontend Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Frontend Push') {

			steps {
				sh 'docker push somsithbook00700/shopping-frontend-image:latest'
			}
		}
		stage('Deploy') {
            steps {
                // Pull the Docker image from Docker Hub
                sh 'docker pull somsithbook00700/shopping-frontend-image:latest'
                
                // Run the Docker container using the pulled image
                sh 'docker run -d -p 3000:3000 somsithbook00700/shopping-frontend-image:latest npm start'
           	 }
        }
	}

	
}
