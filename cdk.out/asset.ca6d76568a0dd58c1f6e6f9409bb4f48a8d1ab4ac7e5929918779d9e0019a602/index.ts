import TodoUsecase from "./usecase/todoUsecase";

const todoUsecase = new TodoUsecase();

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    todoId: string;
    todo: Todo;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  switch (event.info.fieldName) {
    case "addTodo":
      return await todoUsecase.addTodo(event.arguments.todo);
    case "getTodos":
      return await todoUsecase.getTodos();
    case "deleteTodo":
      return await todoUsecase.deleteTodo(event.arguments.todoId);
    case "updateTodo":
      return await todoUsecase.updateTodo(event.arguments.todo);
    default:
      return null;
  }
};
