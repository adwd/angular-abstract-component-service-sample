import { Injectable } from '@angular/core';

// TODO: implement this service with actual toast, not console.log
@Injectable()
export class ToastService {

  constructor() { }

  success(message: string) {
    console.log(message);
  }

  error(message: string) {
    console.log(message);
  }

}
