import { MaterialInstance, MaterialSlider } from './../../shared/interfaces';
import { Material } from './../../shared/classes/material';
import {
  Component, OnInit, ViewChild, ElementRef,
  AfterViewInit, OnDestroy, ViewChildren, QueryList
} from '@angular/core';
import * as PhotoSwipe from 'photoswipe/dist/photoswipe.min.js'
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.min.js'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('slider') sliderRef: ElementRef
  @ViewChild('megaphoto') megaphotoRef: ElementRef
  @ViewChild('leftButtonSwiper') leftButtonSwiperRef: ElementRef
  @ViewChildren('slide') slides: QueryList<ElementRef>;

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

  open(i: number) {
    const nativeElems = this.slides.toArray().map(elem => elem.nativeElement)
    const items = []


    const options = {
      index: i,
      bgOpacity: 0.8
    }

    nativeElems.forEach(elem => {
      const img = new Image()
      img.src = elem.src

      const option = {
        src: elem.src,
        w: null,
        h: null
      }

      img.onload = function(e: any) {
        option.w = e.composedPath()[0].width
        option.h = e.composedPath()[0].height
      }
      items.push(option)
    })

    const gallery = new PhotoSwipe ( 
      this.megaphotoRef.nativeElement, 
      PhotoSwipeUI_Default, 
      items,
      options
    );
    gallery.init();
    console.log(items);
    
    
  }

  private swipeLeftTwo(){

  }
}
