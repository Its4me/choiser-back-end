import { User } from './../interfaces';
import { Material } from './../classes/material';
import { RegionService } from './region.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { startWith, map, tap } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-region-choise',
  templateUrl: './region-choise.component.html',
  styleUrls: ['./region-choise.component.scss']
})
export class RegionChoiseComponent implements OnInit, OnDestroy {
  @Input() location?: User = {}
  @Input() errors?
  @Input() updateForm: EventEmitter<any>

  regions: any[] = []
  regionsAutoComplete$: Observable<any> 
  cities: any[] = []
  citiesAutoComplete:  any[] = []

  form = this.fb.group({
    region: [this.location.region, Validators],
    city: [this.location.city]
  }, {
      validators: [
        this.regionValidation('region', true),
        this.regionValidation('city', false)
      ]
    })

  constructor(
    private fb: FormBuilder,
    private regionServ: RegionService,
  ) { 
    this.regionsAutoComplete$ = this.form.get('region').valueChanges.pipe(
        startWith(''),
        map(region => this._filter(region, this.regions)))
    
    this.form.get('city').valueChanges
      .pipe(
      untilDestroyed(this),
      startWith(''))
      .subscribe(
        value => {
         this.citiesAutoComplete = this._filter(value, this.cities)
        }
      )
   }

  ngOnInit() {
    this.regionServ.getRegion()
      .pipe(untilDestroyed(this))
      .subscribe(
        regions => {
          this.regions = regions.areas
          const data = {}
          regions.areas.forEach(region => {
            data[region.name] = null
          })
        }
      )


      
      this.form.patchValue({
        region: this.location.region,
        city: this.location.city
      })

      this.updateForm
        .pipe(untilDestroyed(this))
        .subscribe( res => {
          this.form.patchValue({
            region: this.location.region,
            city: this.location.city
          })
         
      })
  }

  ngOnDestroy(){}

  checkRegion(){
    if(this.form.get('region').errors){
      this.errors.region = true
      this.form.get('city').setValue('')
      this.form.get('city').disable()
      this.location.region = ''
      this.location.city = ''
    }else{
      this.errors.region = false
      this.location.region = this.form.get('region').value
      this.form.get('city').enable()
    }
    
    
  }
  uploadCities(){
    const regionName = this.form.get('region').value
    if(!regionName){
      this.form.get('city').disable()
      return;
    }
    const region = this.regions.filter(region => region.name == regionName)

    this.regionServ.getCities(region[0].id)
      .pipe(untilDestroyed(this))
      .subscribe(cities => {
        this.cities = cities.areas
        this.citiesAutoComplete =this.cities
      })
  }
  checkCity(){
    if(this.form.get('city').errors){
      this.errors.city = true
      this.location.city = ''
    }else{
      this.errors.city = false
      this.location.city = this.form.get('city').value
    }
  }



  private regionValidation(region: string, choseArray: boolean) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[region];
      const array: any = choseArray ? this.regions : this.cities;
      let checkError: boolean = true;
      if (array) {
        array.forEach(reg => {
          if (reg.name == control.value) {
            checkError = false;
          }
        });
      }

      checkError ? control.setErrors({ unkwounRegion: true }) : control.setErrors(null);
    }
  }

  private _filter(value: string, array: any[]) {
    const filterValue = value? value.toLowerCase() : ''
    return array.filter(state => state.name.toLowerCase().includes(filterValue))
  }
}
