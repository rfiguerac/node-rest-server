"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const todos = [
    { id: 1, text: "Buy milk", completedAt: new Date() },
    { id: 2, text: "Buy bread", completedAt: null },
    { id: 3, text: "Buy butter", completedAt: new Date() },
];
class TodosController {
    constructor() {
        this.getTodos = (req, res) => {
            res.json(todos);
        };
        this.getTodoById = (req, res) => {
            const id = +req.params.id;
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid ID format" });
            }
            const todo = todos.find((todo) => todo.id === id);
            if (todo) {
                res.json(todo);
            }
            res.status(404).json({ error: "Todo not found" });
        };
        this.createTodo = (req, res) => {
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
        };
        this.updateTodo = (req, res) => {
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
            todos[todoIndex] = Object.assign(Object.assign({}, todos[todoIndex]), { text: body.text, completedAt: body.completedAt ? new Date(body.completedAt) : null });
            res.json(todos[todoIndex]);
        };
        this.deleteTodo = (req, res) => {
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
        };
    }
}
exports.TodosController = TodosController;
