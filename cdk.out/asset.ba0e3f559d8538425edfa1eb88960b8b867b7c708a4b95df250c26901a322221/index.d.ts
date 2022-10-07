declare const AWS: any;
declare const docClient: any;
declare function addTodo(todo: Todo): Promise<Todo | null>;
declare function getTodos(): Promise<any>;
declare function deleteTodo(todoId: string): Promise<string | null>;
declare type Params = {
    TableName: string | undefined;
    Key: string | {};
    ExpressionAttributeValues: any;
    ExpressionAttributeNames: any;
    UpdateExpression: string;
    ReturnValues: string;
};
declare function updateTodo(todo: any): Promise<any>;
declare type Todo = {
    id: string;
    title: string;
    done: boolean;
};
declare type AppSyncEvent = {
    info: {
        fieldName: string;
    };
    arguments: {
        todoId: string;
        todo: Todo;
    };
};
