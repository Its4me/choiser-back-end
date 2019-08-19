import { PreparationService } from './../preparation.service';
import { Photo } from './../../../../shared/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-choised-photo',
  templateUrl: './choised-photo.component.html',
  styleUrls: ['./choised-photo.component.scss']
})
export class ChoisedPhotoComponent implements OnInit {
  @Input() position: string

  photos: Photo[] = [,,,,,]
  myIndex: number

  constructor(
    public preparationServ: PreparationService
  ) { }

  ngOnInit() {
    this.myIndex = this.preparationServ.index
  }

  drop(event: CdkDragDrop <Photo[]>) { 
    moveItemInArray(this.preparationServ.photos[this.myIndex], event.previousIndex, event.currentIndex);
  }
  
}
