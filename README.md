# AWS CDK TypeScript project for Serveless API using AppSync,Lambda and DynamoDB

This code is written in AWS cdk v1.176.0. 

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## AppSync
Appsync is alterantive of REST API to communicate with backend as per need.You can access data from one or more sources or microservices with a single network request.
## Lambda 
Lambda is serverless function where you can run code without provisioning or managing infrastructure.
## DynamoDB 
AWS offers DynamoDB, a key-value pair database. This database is widely used in the majority of AWS's EDA Architecture.
## Deploy to AWS 
* `npx cdk deploy`   deploy your stack to your AWS Account
## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
