import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/Todo';
import { SubmitButtonTaskState } from 'src/app/util/const';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css'],
})
export class AddTodoFormComponent implements OnChanges {
  @Input() selectedIndex: number = -1;
  @Input() isUpdateMode: boolean = false;
  @Input() inputTodo: Todo = {
    content: '',
    completed: false,
  };
  @Output() newTodoEvent = new EventEmitter<Todo>();
  @Output() editTodoEvent = new EventEmitter<any>();
  contentTodo: string = '';
  isEditMode: boolean = false;
  isSubmitted: boolean = false;
  submitButtonState = SubmitButtonTaskState;

  errorMessage = { task: {} };

  addTaskForm = new FormGroup({
    taskInput: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get taskInput() {
    return this.addTaskForm.get('taskInput');
  }

  validateTaskInput() {
    if (this.taskInput?.errors) {
      this.errorMessage.task = this.taskInput?.errors;
    }
  }

  isObjectEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.validateTaskInput();
    if (this.isObjectEmpty(this.errorMessage['task'])) {
      if (this.isUpdateMode) {
        this.onEditTodo();
      } else {
        this.onAddTodo();
      }
    } else {
      this.errorMessage.task = {};
    }
  }

  onAddTodo() {
    const todo: Todo = {
      content: this.contentTodo,
      completed: false,
    };
    this.newTodoEvent.emit(todo);
    this.isSubmitted = false;
  }

  onEditTodo() {
    if (this.isUpdateMode) {
      this.inputTodo.content = this.contentTodo;
      this.editTodoEvent.emit({ id: this.selectedIndex, todo: this.inputTodo });
    }
    this.isSubmitted = false;
  }

  ngOnChanges(): void {
    this.contentTodo = this.inputTodo.content;
  }

  onFocus(): void {
    if (this.contentTodo == '') {
      this.isSubmitted = false;
      this.isEditMode = !this.isEditMode;
    }
  }

  onFocusOut(): void {
    this.isEditMode = false;
  }
}
