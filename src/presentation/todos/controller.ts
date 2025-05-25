import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: new Date() },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) : void => {
    const id = +req.params.id;
    if (isNaN(id)) {
       res.status(400).json({ error: "Invalid ID format" });
    }
      const todo = todos.find((todo) => todo.id === id);
    if(todo){  res.json(todo); }
     res.status(404).json({ error: "Todo not found" });
  };

  public createTodo = (req: Request, res: Response) : void => {

    const body = req.body;
    if (!body.text) {
      res.status(400).json({ error: "Todo text is required" });
      return;
    }
    const newTodo = {
      id: todos.length + 1,
      text: body.text,
      completedAt: body.completedAt ? new Date(body.completedAt) : null
    };
    todos.push(newTodo);

    res.json(newTodo);
  }

  public updateTodo = (req: Request, res: Response) : void => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    const body = req.body;
    if (!body.text) {
      res.status(400).json({ error: "Todo text is required" });
      return;
    }
    todos[todoIndex] = { ...todos[todoIndex], text: body.text, completedAt: body.completedAt ? new Date(body.completedAt) : null };
    res.json(todos[todoIndex]);
  };
  public deleteTodo = (req: Request, res: Response) : void => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    todos.splice(todoIndex, 1);
    res.status(204).send();

  }

}
