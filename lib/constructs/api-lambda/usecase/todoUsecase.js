"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
class TodoUsecase {
    async addTodo(todo) {
        const params = {
            TableName: process.env.TODOS_TABLE,
            Item: todo,
        };
        try {
            await docClient.put(params).promise();
            return todo;
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            return null;
        }
    }
    async updateTodo(todo) {
        let params = {
            TableName: process.env.TODOS_TABLE,
            Key: {
                id: todo.id,
            },
            ExpressionAttributeValues: {},
            ExpressionAttributeNames: {},
            UpdateExpression: "",
            ReturnValues: "UPDATED_NEW",
        };
        let prefix = "set ";
        let attributes = Object.keys(todo);
        for (let i = 0; i < attributes.length; i++) {
            let attribute = attributes[i];
            if (attribute !== "id") {
                params["UpdateExpression"] +=
                    prefix + "#" + attribute + " = :" + attribute;
                params["ExpressionAttributeValues"][":" + attribute] = todo[attribute];
                params["ExpressionAttributeNames"]["#" + attribute] = attribute;
                prefix = ", ";
            }
        }
        try {
            await docClient.update(params).promise();
            return todo;
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            return null;
        }
    }
    // Function Declation to Get all todo list
    async getTodos() {
        const params = {
            TableName: process.env.TODOS_TABLE,
        };
        try {
            const data = await docClient.scan(params).promise();
            return data.Items;
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            return null;
        }
    }
    // Function Declation to Delete Todo
    async deleteTodo(todoId) {
        const params = {
            TableName: process.env.TODOS_TABLE,
            Key: {
                id: todoId,
            },
        };
        try {
            await docClient.delete(params).promise();
            return todoId;
        }
        catch (err) {
            console.log("DynamoDB error: ", err);
            return null;
        }
    }
}
exports.default = TodoUsecase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kb1VzZWNhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b2RvVXNlY2FzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUUvQixNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFFcEQsTUFBcUIsV0FBVztJQUM5QixLQUFLLENBQUMsT0FBTyxDQUFDLElBQVU7UUFDdEIsTUFBTSxNQUFNLEdBQUc7WUFDYixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO1lBQ2xDLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztRQUNGLElBQUk7WUFDRixNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBUztRQUN4QixJQUFJLE1BQU0sR0FBVztZQUNuQixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO1lBQ2xDLEdBQUcsRUFBRTtnQkFDSCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7YUFDWjtZQUNELHlCQUF5QixFQUFFLEVBQUU7WUFDN0Isd0JBQXdCLEVBQUUsRUFBRTtZQUM1QixnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLFlBQVksRUFBRSxhQUFhO1NBQzVCLENBQUM7UUFDRixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDcEIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUN0QixNQUFNLENBQUMsa0JBQWtCLENBQUM7b0JBQ3hCLE1BQU0sR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZFLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQ2hFLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDZjtTQUNGO1FBRUQsSUFBSTtZQUNGLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN6QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsMENBQTBDO0lBQzFDLEtBQUssQ0FBQyxRQUFRO1FBQ1osTUFBTSxNQUFNLEdBQUc7WUFDYixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO1NBQ25DLENBQUM7UUFDRixJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUNELG9DQUFvQztJQUNwQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWM7UUFDN0IsTUFBTSxNQUFNLEdBQUc7WUFDYixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXO1lBQ2xDLEdBQUcsRUFBRTtnQkFDSCxFQUFFLEVBQUUsTUFBTTthQUNYO1NBQ0YsQ0FBQztRQUNGLElBQUk7WUFDRixNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekMsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztDQUNGO0FBN0VELDhCQTZFQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEFXUyA9IHJlcXVpcmUoXCJhd3Mtc2RrXCIpO1xuXG5jb25zdCBkb2NDbGllbnQgPSBuZXcgQVdTLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9Vc2VjYXNlIHtcbiAgYXN5bmMgYWRkVG9kbyh0b2RvOiBUb2RvKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5UT0RPU19UQUJMRSxcbiAgICAgIEl0ZW06IHRvZG8sXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZG9jQ2xpZW50LnB1dChwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIHJldHVybiB0b2RvO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coXCJEeW5hbW9EQiBlcnJvcjogXCIsIGVycik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBhc3luYyB1cGRhdGVUb2RvKHRvZG86IGFueSkge1xuICAgIGxldCBwYXJhbXM6IFBhcmFtcyA9IHtcbiAgICAgIFRhYmxlTmFtZTogcHJvY2Vzcy5lbnYuVE9ET1NfVEFCTEUsXG4gICAgICBLZXk6IHtcbiAgICAgICAgaWQ6IHRvZG8uaWQsXG4gICAgICB9LFxuICAgICAgRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlczoge30sXG4gICAgICBFeHByZXNzaW9uQXR0cmlidXRlTmFtZXM6IHt9LFxuICAgICAgVXBkYXRlRXhwcmVzc2lvbjogXCJcIixcbiAgICAgIFJldHVyblZhbHVlczogXCJVUERBVEVEX05FV1wiLFxuICAgIH07XG4gICAgbGV0IHByZWZpeCA9IFwic2V0IFwiO1xuICAgIGxldCBhdHRyaWJ1dGVzID0gT2JqZWN0LmtleXModG9kbyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpXTtcbiAgICAgIGlmIChhdHRyaWJ1dGUgIT09IFwiaWRcIikge1xuICAgICAgICBwYXJhbXNbXCJVcGRhdGVFeHByZXNzaW9uXCJdICs9XG4gICAgICAgICAgcHJlZml4ICsgXCIjXCIgKyBhdHRyaWJ1dGUgKyBcIiA9IDpcIiArIGF0dHJpYnV0ZTtcbiAgICAgICAgcGFyYW1zW1wiRXhwcmVzc2lvbkF0dHJpYnV0ZVZhbHVlc1wiXVtcIjpcIiArIGF0dHJpYnV0ZV0gPSB0b2RvW2F0dHJpYnV0ZV07XG4gICAgICAgIHBhcmFtc1tcIkV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lc1wiXVtcIiNcIiArIGF0dHJpYnV0ZV0gPSBhdHRyaWJ1dGU7XG4gICAgICAgIHByZWZpeCA9IFwiLCBcIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZG9jQ2xpZW50LnVwZGF0ZShwYXJhbXMpLnByb21pc2UoKTtcbiAgICAgIHJldHVybiB0b2RvO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coXCJEeW5hbW9EQiBlcnJvcjogXCIsIGVycik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvLyBGdW5jdGlvbiBEZWNsYXRpb24gdG8gR2V0IGFsbCB0b2RvIGxpc3RcbiAgYXN5bmMgZ2V0VG9kb3MoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5UT0RPU19UQUJMRSxcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZG9jQ2xpZW50LnNjYW4ocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgICByZXR1cm4gZGF0YS5JdGVtcztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRHluYW1vREIgZXJyb3I6IFwiLCBlcnIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG4gIC8vIEZ1bmN0aW9uIERlY2xhdGlvbiB0byBEZWxldGUgVG9kb1xuICBhc3luYyBkZWxldGVUb2RvKHRvZG9JZDogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgVGFibGVOYW1lOiBwcm9jZXNzLmVudi5UT0RPU19UQUJMRSxcbiAgICAgIEtleToge1xuICAgICAgICBpZDogdG9kb0lkLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkb2NDbGllbnQuZGVsZXRlKHBhcmFtcykucHJvbWlzZSgpO1xuICAgICAgcmV0dXJuIHRvZG9JZDtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRHluYW1vREIgZXJyb3I6IFwiLCBlcnIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=