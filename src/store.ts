export interface Todo {
  id: number;
  text: string;
}

const todos: Todo[] = [];
let nextId = 1;

export const getTodos = (): Todo[] => todos;

export const addTodo = (text: string): Todo => {
  const todo: Todo = { id: nextId++, text };
  todos.push(todo);
  return todo;
};

export const resetStore = (): void => {
  todos.length = 0;
  nextId = 1;
};
