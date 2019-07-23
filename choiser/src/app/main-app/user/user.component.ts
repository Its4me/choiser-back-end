import { AvatarPopUpComponent } from './avatar-pop-up/avatar-pop-up.component';
import { AuthCoreService } from './../../core/services/authCore.service';
import { Material } from 'src/app/shared/classes/material';
import { User, Photo } from './../../shared/interfaces';

import {
  Component, OnInit, ViewChild, ElementRef,
  AfterViewInit, OnDestroy, ViewChildren, QueryList, EventEmitter
} from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  @ViewChild(SwiperDirective) slider: SwiperDirective;
  @ViewChildren('slide') slides: QueryList<ElementRef>;

  private openBigPhoto: EventEmitter<any> = new EventEmitter();

  itsMe: boolean = false
  slidesInstance: any
  user: User = {}

  photoFile: File[] = []
  uploadPhotos: Photo[] = []
  pending: boolean = false

  photos: Photo[] = []

  config: SwiperConfigInterface = {
    navigation: true,
    slidesPerView: 5
  }

  constructor(
    private userServ: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private material: Material,
    private authService: AuthCoreService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pending = true
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(params => {
        this.user._id = params.id
        this.itsMe = this.authService.getId() == this.user._id
        this.getUserPage()
      }, err => {
        this.pending = false
      })
  }

  ngOnDestroy() {

  }

  open(i: number) {
    this.openBigPhoto.emit({ index: i, photos: this.slides })
  }


  formulaStar(likes, views): number {
    const percent = likes * 100 / views
    switch (true) {
      case (percent < 20): return 1
      case (percent < 40): return 2
      case (percent < 55): return 3
      case (percent < 70): return 4
      case (percent >= 70): return 5
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
        this.pending = false
      }, err => {
        this.pending = false
        this.material.openSnackBar('Пользователя с таким id не найдено')
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


  deletePhoto(i: number) {

    const photo = this.photos.find(photo => {
      return photo._id == this.photos[i]._id
    })
    this.photos.splice(i, 1)
    this.slider.update()
    this.userServ.deletePhoto(photo._id)
      .pipe(untilDestroyed(this))
      .subscribe()
  }

  onPhotoLoad(photos: Photo[]) {
    this.photos.push(...photos)
    this.slider.update()
  }

  editAvatar(event: any) {
    const dialogRef = this.dialog.open(AvatarPopUpComponent, { 
      autoFocus: false,
      data: event 
    })
  }
}
