import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../toast.service';

export interface Todo {
  id: string;
  text: string;
}

export abstract class TodosComponentService {
  abstract fetchTodos(): Observable<Todo[]>;
  abstract addTodo(text: string): Promise<'success' | 'too-many-characters' | 'too-many-todos'>;
}

@Component({
  selector: 'app-todos',
  template: `
    <div>
      <ul>
        <li *ngFor="let todo of todos$ | async">{{ todo.text }}</li>
      </ul>
      <input type="text" [(ngModel)]="editingTodo">
      <button (click)="addTodo(editingTodo)">add</button>
    </div>
  `
})
export class TodosComponent {
  editingTodo = '';
  todos$: Observable<Todo[]>;

  constructor(
    private service: TodosComponentService,
    private toast: ToastService,
  ) {
    this.todos$ = service.fetchTodos();
  }

  addTodo(text: string) {
    this.service.addTodo(text).then(result => {
      switch (result) {
        case 'success':
          this.editingTodo = '';
          this.toast.success('Todoを追加しました');
          break;

        case 'too-many-characters':
          this.toast.error('文字数が多すぎます');
          break;

        case 'too-many-todos':
          this.toast.error('TODOは5個までです');
          break;
      }
    });
  }

}
