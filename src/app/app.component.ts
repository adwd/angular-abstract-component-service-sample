import { Component } from '@angular/core';
import { TodosComponentService } from './components/todos/todos.component';
import { TodosComponentServiceImpl } from './todos-component.service.impl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: TodosComponentService, useClass: TodosComponentServiceImpl }
  ]
})
export class AppComponent {
  title = 'app';
}
