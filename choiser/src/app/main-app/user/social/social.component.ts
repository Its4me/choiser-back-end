import { Material } from 'src/app/shared/classes/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  constructor(
    private material: Material
  ) { }

  ngOnInit() {
  }

  copy($event){
    const htmlElem: HTMLElement = $event.target
    htmlElem.classList.add('copied')
    this.material.openSnackBar('Скопировано')
    setTimeout(()=> {
      htmlElem.classList.remove('copied')
    }, 1000)
  }
}
