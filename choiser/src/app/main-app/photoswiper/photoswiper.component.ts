import { AppService } from './../app.service';
import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, OnDestroy } from '@angular/core';
import * as PhotoSwipe from 'photoswipe/dist/photoswipe.min.js'
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.min.js'
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-photoswiper',
  templateUrl: './photoswiper.component.html',
  styleUrls: ['./photoswiper.component.scss']
})
export class PhotoswiperComponent implements OnInit, OnDestroy {

  @ViewChild('megaphoto') megaphotoRef: ElementRef

  gallery = null

  constructor(
    private appServ: AppService
  ) { }

  ngOnInit() {
    this.appServ.getBigPhoto().pipe(
      untilDestroyed(this)).
      subscribe(
        res => this.open(res.index, res.photos)
      )
  }
  ngOnDestroy() {
  }

  open(i: number, slides) {
    
    const items = []
    const nativeElems = slides.toArray().map(elem => elem.nativeElement)

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

      img.onload = function (e: any) {
        option.w = e.composedPath()[0].width
        option.h = e.composedPath()[0].height
      }
      items.push(option)
    })

    this.gallery = new PhotoSwipe(
      this.megaphotoRef.nativeElement,
      PhotoSwipeUI_Default,
      items,
      options
    );
    this.gallery.init();
    setTimeout(() => {
      this.gallery.updateSize(true);
    }, 50)
  }


}
