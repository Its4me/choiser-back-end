import { Photo } from './../../../shared/interfaces';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'choise-photo',
  templateUrl: './choise-photo.component.html',
  styleUrls: ['./choise-photo.component.scss']
})
export class ChoisePhotoComponent implements OnInit {

  @Output () onVote = new EventEmitter<Photo>()
  @Input() photo: Photo

  constructor() { }

  ngOnInit() {
  }


  vote(){
    this.onVote.emit(this.photo)
  }
}
