import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  selectedTodo: Todo = {
    content: '',
    completed: false,
  };
  selectedIndex: number = -1;
  isUpdateMode = false;

  ngOnInit(): void {
    this.todos = [
      { content: 'First todo', completed: false },
      { content: 'Second todo', completed: false },
    ];
  }

  toggleDone(id: number) {
    this.todos.map((value, index) => {
      if (index == id) value.completed = !value.completed;
      return value;
    });
  }

  editTodo(id: number) {
    this.selectedTodo = this.todos[id];
    this.isUpdateMode = true;
  }

  updateTodo(updatedValue: any) {
    let id = updatedValue.id;
    let todo = updatedValue.todo;
    this.todos[id] = todo;
    this.isUpdateMode = false;
    console.log(updatedValue);
    this.resetInput();
  }

  deleteTodo(id: number) {
    if (this.isUpdateMode) {
      this.isUpdateMode = false;
      this.resetInput();
    }
    this.todos = this.todos.filter((_, index) => index != id);
    this.selectedIndex = id;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.resetInput();
  }

  resetInput() {
    this.selectedIndex = -1;
    this.selectedTodo = {
      content: '',
      completed: false,
    };
  }
}
