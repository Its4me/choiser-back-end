import { PreparationService } from './../preparation.service';
import { Photo } from './../../../../shared/interfaces';
import { UserService } from './../../../../core/services/user.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AuthCoreService } from 'src/app/core/services/authCore.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {

  @ViewChild(SwiperDirective) slider: SwiperDirective

  photos: Photo[]
  selected: boolean[] = []
  config: SwiperConfigInterface = {
    navigation: true,
    slidesPerView: 5,
    resistanceRatio: 0,
    breakpoints: {
      1200: {
        slidesPerView: 4
      },
      586: {
        slidesPerView: 3,
        speed: 500
      },
      420: {
        slidesPerView: 2
      }
    }
  }

  constructor(
    private userServ: UserService,
    private authCoreServ: AuthCoreService,
    private preparationServ: PreparationService
  ) { }

  ngOnInit() {
    const userId = this.authCoreServ.getId()
    this.userServ.getUserPhotos(userId)
      .pipe(untilDestroyed(this))
      .subscribe((photos: Photo[]) => {
        this.photos = photos.map(photo => {
          photo.stars = this.userServ.formulaStar(photo.likes, photo.views)
          return photo
        })
      })
  }
  ngOnDestroy(){}

  choise(i:number){
    
    if(this.selected[i]){
      this.preparationServ.removePhoto(this.photos[i])
      this.selected[i] = false
    }else{
      if(this.findSelectedCount() >= 5){
        return
      }
      this.preparationServ.choisePhoto(this.photos[i])
      this.selected[i] = true
    }
  }

  private findSelectedCount(): number {
    let count = 0
    this.selected.forEach((value)=> {
      count += value? 1 : 0
    })
    return count
  }
}
