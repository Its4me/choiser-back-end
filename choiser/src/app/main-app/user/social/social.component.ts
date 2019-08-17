import { Material } from 'src/app/shared/classes/material';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  @Input() user: User

  social: boolean

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
