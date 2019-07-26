import { Material } from './../../shared/classes/material';
import { AuthCoreService } from './../../core/services/authCore.service';
import { UserService } from './../../core/services/user.service';
import { User } from 'src/app/shared/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input() showStepper: boolean
  @Output() onDataLoad = new EventEmitter<any>();
  updateForm: EventEmitter<any> = new EventEmitter()
  location: User = {
    region: '',
    city: ''
  }

  regionErrors = {
    region: false,
    city: false
  }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private userServ: UserService,
    private authCoreServ: AuthCoreService,
    private material: Material
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      sex: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.regionErrors.city || this.regionErrors.region) {
      return
    }
    const data = Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value, this.location)
    this.userServ.editUser(data).subscribe(user => {
      this.authCoreServ.setUser(user)
      this.onDataLoad.emit()
      this.material.openSnackBar('Сохранено')
    },
      err => this.material.openSnackBar(err.message)
    )

  }

}
