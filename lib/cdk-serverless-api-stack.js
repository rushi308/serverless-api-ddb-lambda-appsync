"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkServerlessApiStack = void 0;
const cdk = require("@aws-cdk/core");
const appsync = require("@aws-cdk/aws-appsync");
const lambda = require("@aws-cdk/aws-lambda");
const ddb = require("@aws-cdk/aws-dynamodb");
const path = require("path");
class CdkServerlessApiStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
            name: "todo-api",
            schema: appsync.Schema.fromAsset(path.join(__dirname, "./constructs/graphQL/schema.gql")),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.API_KEY,
                },
            },
        });
        // Lambda Fucntion
        const todoLambda = new lambda.Function(this, "TodoFucntion", {
            functionName: "todoHandler",
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset(path.join(__dirname, "./constructs/api-lambda")),
            handler: "index.handler",
        });
        // Set lambda as a datasource
        const lambda_data_source = api.addLambdaDataSource("lamdaDataSource", todoLambda);
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
exports.CdkServerlessApiStack = CdkServerlessApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXNlcnZlcmxlc3MtYXBpLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXNlcnZlcmxlc3MtYXBpLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyxnREFBZ0Q7QUFDaEQsOENBQThDO0FBQzlDLDZDQUE2QztBQUM3Qyw2QkFBNkI7QUFDN0IsTUFBYSxxQkFBc0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNsRCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3RELElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsaUNBQWlDLENBQUMsQ0FDeEQ7WUFDRCxtQkFBbUIsRUFBRTtnQkFDbkIsb0JBQW9CLEVBQUU7b0JBQ3BCLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPO2lCQUNyRDthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsa0JBQWtCO1FBQ2xCLE1BQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzNELFlBQVksRUFBRSxhQUFhO1lBQzNCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx5QkFBeUIsQ0FBQyxDQUNoRDtZQUNELE9BQU8sRUFBRSxlQUFlO1NBQ3pCLENBQUMsQ0FBQztRQUVILDZCQUE2QjtRQUM3QixNQUFNLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxtQkFBbUIsQ0FDaEQsaUJBQWlCLEVBQ2pCLFVBQVUsQ0FDWCxDQUFDO1FBRUYscUNBQXFDO1FBRXJDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUM7UUFFSCxrQkFBa0IsQ0FBQyxjQUFjLENBQUM7WUFDaEMsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFNBQVM7U0FDckIsQ0FBQyxDQUFDO1FBRUgsa0JBQWtCLENBQUMsY0FBYyxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQztRQUVILGtCQUFrQixDQUFDLGNBQWMsQ0FBQztZQUNoQyxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsWUFBWTtTQUN4QixDQUFDLENBQUM7UUFFSCxNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN0RCxTQUFTLEVBQUUsY0FBYztZQUN6QixZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTTthQUMvQjtTQUNGLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9ELElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3RDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFyRUQsc0RBcUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gXCJAYXdzLWNkay9hd3MtYXBwc3luY1wiO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBkZGIgZnJvbSBcIkBhd3MtY2RrL2F3cy1keW5hbW9kYlwiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuZXhwb3J0IGNsYXNzIENka1NlcnZlcmxlc3NBcGlTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBhcGkgPSBuZXcgYXBwc3luYy5HcmFwaHFsQXBpKHRoaXMsIFwiR1JBUEhRTF9BUElcIiwge1xuICAgICAgbmFtZTogXCJ0b2RvLWFwaVwiLFxuICAgICAgc2NoZW1hOiBhcHBzeW5jLlNjaGVtYS5mcm9tQXNzZXQoXG4gICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi9jb25zdHJ1Y3RzL2dyYXBoUUwvc2NoZW1hLmdxbFwiKVxuICAgICAgKSwgLy8vUGF0aCBzcGVjaWZpZWQgZm9yIGxhbWJkYVxuICAgICAgYXV0aG9yaXphdGlvbkNvbmZpZzoge1xuICAgICAgICBkZWZhdWx0QXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBhcHBzeW5jLkF1dGhvcml6YXRpb25UeXBlLkFQSV9LRVksIC8vL0RlZmluaW5nIEF1dGhvcml6YXRpb24gVHlwZVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIExhbWJkYSBGdWNudGlvblxuICAgIGNvbnN0IHRvZG9MYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiVG9kb0Z1Y250aW9uXCIsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogXCJ0b2RvSGFuZGxlclwiLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsIC8vL3NldCBub2RlanMgcnVudGltZSBlbnZpcm9ubWVudFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KFxuICAgICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4vY29uc3RydWN0cy9hcGktbGFtYmRhXCIpXG4gICAgICApLFxuICAgICAgaGFuZGxlcjogXCJpbmRleC5oYW5kbGVyXCIsIC8vL3NwZWNmaWMgZnVjbnRpb24gaW4gc3BlY2lmaWMgZmlsZVxuICAgIH0pO1xuXG4gICAgLy8gU2V0IGxhbWJkYSBhcyBhIGRhdGFzb3VyY2VcbiAgICBjb25zdCBsYW1iZGFfZGF0YV9zb3VyY2UgPSBhcGkuYWRkTGFtYmRhRGF0YVNvdXJjZShcbiAgICAgIFwibGFtZGFEYXRhU291cmNlXCIsXG4gICAgICB0b2RvTGFtYmRhXG4gICAgKTtcblxuICAgIC8vL0Rlc2NyaWJpbmcgcmVzb2x2ZXIgZm9yIGRhdGFzb3VyY2VcblxuICAgIGxhbWJkYV9kYXRhX3NvdXJjZS5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxuICAgICAgZmllbGROYW1lOiBcImdldFRvZG9zXCIsXG4gICAgfSk7XG5cbiAgICBsYW1iZGFfZGF0YV9zb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJhZGRUb2RvXCIsXG4gICAgfSk7XG5cbiAgICBsYW1iZGFfZGF0YV9zb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJkZWxldGVUb2RvXCIsXG4gICAgfSk7XG5cbiAgICBsYW1iZGFfZGF0YV9zb3VyY2UuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJ1cGRhdGVUb2RvXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2Rvc1RhYmxlID0gbmV3IGRkYi5UYWJsZSh0aGlzLCBcIkNES1RvZG9zVGFibGVcIiwge1xuICAgICAgdGFibGVOYW1lOiBcIjEzQVRvZG90YWJsZVwiLFxuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6IFwiaWRcIixcbiAgICAgICAgdHlwZTogZGRiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRvZG9zVGFibGUuZ3JhbnRGdWxsQWNjZXNzKHRvZG9MYW1iZGEpO1xuXG4gICAgdG9kb0xhbWJkYS5hZGRFbnZpcm9ubWVudChcIlRPRE9TX1RBQkxFXCIsIHRvZG9zVGFibGUudGFibGVOYW1lKTtcbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIlN0YWNrIFJlZ2lvblwiLCB7XG4gICAgICB2YWx1ZTogdGhpcy5yZWdpb24sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==