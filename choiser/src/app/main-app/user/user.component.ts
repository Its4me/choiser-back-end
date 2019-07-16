import { MaterialSlider, User, Photo } from './../../shared/interfaces';
import { Material } from './../../shared/classes/material';
import {
  Component, OnInit, ViewChild, ElementRef,
  AfterViewInit, OnDestroy, ViewChildren, QueryList, EventEmitter
} from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
  sliderCheck: boolean = false

  photoFile: File[] = []
  uploadPhotos: Photo[] = []
  pending: boolean = false

  photos: Photo[] = []



  constructor(
    private userServ: UserService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.pending = true
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(params => {
        this.user._id = params.id
        this.getUserPage()
      }, err => {
        this.pending = false
      })
    // this.router.events
    //   .pipe(untilDestroyed(this))
    //   .subscribe((params) => {
    //     if (params instanceof NavigationEnd) {
    //       console.log(params);
    //     }
    //   });
  }

  ngAfterViewInit() {
    this.initSLider()
  }
  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy()
    }
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

  getUserPage() {
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
        this.initSLider()
        this.pending = false
      }, err => {
        this.pending = false
        Material.toast('Пользователя с таким id не найдено')
        this.router.navigate(['choise'])
      }
      
      
      )
  }
  onPhotosUpload(event: any) {
    this.photoFile = []
    this.uploadPhotos = []

    for (let i = 0; i < Object.keys(event.target.files).length; i++) {
      const reader = new FileReader()

      this.photoFile.push(event.target.files[i])
      this.uploadPhotos[i] = {}
      reader.readAsDataURL(event.target.files[i])

      reader.onload = () => {
        this.uploadPhotos[i].photo = reader.result as string
      }
    }

  }


  initSLider() {
    this.sliderCheck = this.photos.length > 5
    if (this.sliderCheck) {
      setTimeout(() => this.slider = Material.initSlider(this.sliderRef), 50)
    }
  }
  deletePhoto(i: number) {
    Material.toast('Удалено')
    
    const photo = this.photos.find(photo => {
      return photo._id == this.photos[i]._id
    })
    this.photos.splice(i, 1)
    if(this.slider){
      this.slider.destroy()
    }
    this.initSLider()

    this.userServ.deletePhoto(photo._id)
      .pipe(untilDestroyed(this))
      .subscribe(
        res => { }
        // error => console.log(error)
      )
  }

  onPhotoLoad(photos: Photo[]){
    this.photos.push(...photos)
    if(this.slider){
      this.slider.destroy()
    }
    this.initSLider()
  }
}
