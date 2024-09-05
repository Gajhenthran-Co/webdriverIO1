pipeline {
    agent any

    environment {
        // Define environment variables needed for the pipeline
        NODE_VERSION = '20.x' // Change this to the version you need
        REPORT_DIR = 'allure-report'
    }

    tools {
        // Install Node.js
        nodejs "${NODE_VERSION}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git branch: 'main', url: 'https://github.com/Gajhenthran/webdriverIO1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install all dependencies using npm
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run WebdriverIO tests
                bat 'npx wdio run wdio.conf.js'
            }
        }

        stage('Generate Allure Report') {
            steps {
                // Generate Allure report
                bat 'npx allure generate --clean allure-results'
                bat 'npx allure open allure-report &'
            }
        }

        stage('Publish Report') {
            steps {
                // Publish HTML report using HTML Publisher Plugin
                publishHTML([reportDir: "${REPORT_DIR}", reportFiles: 'index.html', reportName: 'Allure Test Report'])
            }
        }
    }

    post {
        always {
            // Clean up after the pipeline completes
            echo 'Cleaning up...'
            bat 'rmdir /S /Q .\\workspace' // Clean workspace on Windows
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}