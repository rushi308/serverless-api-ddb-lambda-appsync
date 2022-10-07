export default class TodoUsecase {
    addTodo(todo: Todo): Promise<Todo | null>;
    updateTodo(todo: any): Promise<any>;
    getTodos(): Promise<any>;
    deleteTodo(todoId: string): Promise<string | null>;
}
