import { UserCoreService } from './../../core/services/userCore.service';
import { MaterialSlider, User, Photo } from './../../shared/interfaces';
import { Material } from './../../shared/classes/material';
import {
  Component, OnInit, ViewChild, ElementRef,
  AfterViewInit, OnDestroy, ViewChildren, QueryList, EventEmitter
} from '@angular/core';
import { UserService } from './user.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

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
  user: User = {}
  sliderInit: boolean

  photos: Photo[] = [
    // { img: 'assets/test1.jpg', star: 4 },
    // { img: 'assets/test2.jpg', star: 5 },
    // { img: 'assets/test3.jpg', star: 3 },
    // { img: 'assets/test4.jpg', star: 2 },
    // { img: 'assets/test5.jpg', star: 1 },
    // { img: 'assets/test6.jpg', star: 4 },
    // { img: 'assets/test7.jpg', star: 3 },
  ]



  constructor(
    private userCore: UserCoreService,
    private userServ: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.user._id = params.id
    })

    forkJoin(
      this.userServ.getUserFromBack(this.user._id),
      this.userServ.getUserPhotos(this.user._id))
      .pipe(untilDestroyed(this))
      .subscribe(([user, photos]) => {
        this.user = user
        this.photos = photos.map(photo => {
          photo.stars = this.formulaStar(photo.likes, photo.views)
          return photo
        })
        this.sliderInit = this.photos.length > 5
      })

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
    this.openBigPhoto.emit({ index: i, photos: this.slides })
  }


  formulaStar(likes, views): number {
    const percent = likes * 100 / views
    switch (true) {
      case (percent < 35): return 1
      case (percent < 45): return 2
      case (percent < 50): return 3
      case (percent < 55): return 4
      case (percent >= 55): return 5
    }
  }

}
