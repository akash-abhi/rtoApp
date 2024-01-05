import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class CalendarService {

  private eventsSource = new BehaviorSubject([]);

  currentEvents = this.eventsSource.asObservable();
 
  constructor() { }


  updateEvents(newEvents:any): void {
    this.eventsSource.next(newEvents);
    
  }

  
}
