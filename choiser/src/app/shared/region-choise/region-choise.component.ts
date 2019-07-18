import { Material } from './../classes/material';
import { RegionService } from './region.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-region-choise',
  templateUrl: './region-choise.component.html',
  styleUrls: ['./region-choise.component.scss']
})
export class RegionChoiseComponent implements OnInit {
  @Input() region: string
  @Input() city: string

  regions: any
  cities: any

  form = this.fb.group({
    region: [this.region, Validators],
    city: [this.city]
  },{
    validators: [
      this.regionValidation('region', true),
      this.regionValidation('city', false)
    ]
  })

  constructor(
    private fb: FormBuilder,
    private regionServ: RegionService,
  ) { }

  ngOnInit() {
    this.regionServ.getRegion().subscribe(
      regions => {
       this.regions = regions.areas
        const data = {}
        regions.areas.forEach(region => {
          data[region.name] = null
        })
      }
    )
  }

   private regionValidation(region: string, choseArray: boolean) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[region];
        const array: any = choseArray? this.regions : this.cities;
        let checkError: boolean = true;
        if(array){
          array.forEach(reg => {
            if(reg.name == control.value){
              checkError = false;
            }
          });
        }
       
        checkError? control.setErrors({ unkwounRegion: true }) : control.setErrors(null);
    }
  }
}
