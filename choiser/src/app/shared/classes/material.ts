import { MaterialInstance, MaterialSlider } from './../interfaces';
import { ElementRef } from '@angular/core';

declare var M

export class Material {
  static toast(text: string) {
    M.toast({ html: text })
  }
  static initSlider(elem: ElementRef): MaterialSlider {
    return M.Carousel.init(elem.nativeElement, {
      dist: 0,
      numVisible: 5,
      padding: 0
    });
  }
  static initPhotoView(elems: ElementRef[]){
    const nativeElems = elems.map(elem => elem.nativeElement)
    
  
  }
}