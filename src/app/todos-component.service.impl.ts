import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

import { Todo, TodosComponentService } from './components/todos/todos.component';

// TODO: implement this service with HttpClient
@Injectable()
export class TodosComponentServiceImpl implements TodosComponentService {
  
  fakeTodos = new BehaviorSubject([
    { id: '1', text: 'learn Angular' },
    { id: '2', text: 'write apps' },
  ]);

  fetchTodos(): Observable<Todo[]> {
    return this.fakeTodos.asObservable();
  }

  addTodo(text: string): Promise<'success' | 'too-many-characters' | 'too-many-todos'> {
    let result;
    if (text.length > 20) {
      result = 'too-many-characters';
    } else if (this.fakeTodos.getValue().length >= 5) {
      result = 'too-many-todos';
    } else {
      const current = this.fakeTodos.getValue();
      this.fakeTodos.next([
        ...current,
        { id: String(current.length + 1), text }
      ]);
      result = 'success';
    }

    return Promise.resolve(result);
  }
}
