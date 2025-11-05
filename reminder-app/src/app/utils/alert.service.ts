import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private message = new BehaviorSubject<string>('');
  message$ = this.message.asObservable();

  setMessage(value: string) {
    this.message.next(value);
  }
}
