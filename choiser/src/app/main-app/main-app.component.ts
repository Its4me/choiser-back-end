import { UserCoreService } from './../core/services/userCore.service';
import { Router } from '@angular/router';
import { AuthCoreService } from './../core/services/authCore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {

  constructor(
    private userCore: UserCoreService
  ) { }

  ngOnInit() {

 
  }

}
