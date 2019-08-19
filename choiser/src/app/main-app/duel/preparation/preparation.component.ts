import { PreparationService } from './preparation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthCoreService } from 'src/app/core/services/authCore.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Location } from '@angular/common';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.scss']
})
export class PreparationComponent implements OnInit, OnDestroy {

  isNew: boolean


  constructor(
    // private auth: AuthCoreService,
    // private userServ: UserService,
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    public preparationServ: PreparationService
  ) { }

  ngOnInit() {

    if(!this.preparationServ.users[1]){
      this.router.navigate(['user/5d40139e5e12c0001703ae02'])
    }

    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe(url => {
        this.isNew = url.id == 'new'
        this.preparationServ.setIsNew(this.isNew)
      })
  }

  ngOnDestroy(){}

  back(){
    this._location.back()
  }

}
