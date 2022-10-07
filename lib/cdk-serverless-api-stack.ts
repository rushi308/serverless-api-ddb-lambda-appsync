import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import * as ddb from "@aws-cdk/aws-dynamodb";
import * as path from "path";
export class CdkServerlessApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: "todo-api",
      schema: appsync.Schema.fromAsset(
        path.join(__dirname, "./constructs/graphQL/schema.gql")
      ), ///Path specified for lambda
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY, ///Defining Authorization Type
        },
      },
    });

    // Lambda Fucntion
    const todoLambda = new lambda.Function(this, "TodoFucntion", {
      functionName: "todoHandler",
      runtime: lambda.Runtime.NODEJS_14_X, ///set nodejs runtime environment
      code: lambda.Code.fromAsset(
        path.join(__dirname, "./constructs/api-lambda")
      ),
      handler: "index.handler", ///specfic fucntion in specific file
    });

    // Set lambda as a datasource
    const lambda_data_source = api.addLambdaDataSource(
      "lamdaDataSource",
      todoLambda
    );

    ///Describing resolver for datasource

    lambda_data_source.createResolver({
      typeName: "Query",
      fieldName: "getTodos",
    });

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
    });

    lambda_data_source.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo",
    });

    const todosTable = new ddb.Table(this, "CDKTodosTable", {
      tableName: "13ATodotable",
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    todosTable.grantFullAccess(todoLambda);

    todoLambda.addEnvironment("TODOS_TABLE", todosTable.tableName);
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });
  }
}
