import {  MaterialSlider } from './../../shared/interfaces';
import { Material } from './../../shared/classes/material';
import {
  Component, OnInit, ViewChild, ElementRef,
  AfterViewInit, OnDestroy, ViewChildren, QueryList, EventEmitter
} from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('slider') sliderRef: ElementRef
  @ViewChildren('slide') slides: QueryList<ElementRef>;
  private openBigPhoto: EventEmitter<any> = new EventEmitter();

  slider: MaterialSlider
  slidesInstance: any

  sliderInit: boolean

  photos = [
    { img: 'assets/test1.jpg', star: 4 },
    { img: 'assets/test2.jpg', star: 5 },
    { img: 'assets/test3.jpg', star: 3 },
    { img: 'assets/test4.jpg', star: 2 },
    { img: 'assets/test5.jpg', star: 1 },
    { img: 'assets/test6.jpg', star: 4 },
    { img: 'assets/test7.jpg', star: 3 },
  ]



  constructor() { }

  ngOnInit() {
    this.sliderInit = this.photos.length > 5
  }

  ngAfterViewInit() {

    if (this.sliderInit) {
      this.slider = Material.initSlider(this.sliderRef)
    }

  }
  ngOnDestroy() {
    this.slider.destroy()

  }

  nextSlide() {
    this.slider.next()
  }
  prevSlide() {
    this.slider.prev()
  }
  open(i:number) {
    this.openBigPhoto.emit({index: i, photos: this.slides})
  }
 
  
}
