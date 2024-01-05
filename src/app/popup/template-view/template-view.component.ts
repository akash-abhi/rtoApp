import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-template-view',
  templateUrl: './template-view.component.html',
  styleUrls: ['./template-view.component.scss']
})
export class TemplateViewComponent implements OnInit {

  @Output() closePopup = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose():void{
    this.closePopup.emit();
  }

}
