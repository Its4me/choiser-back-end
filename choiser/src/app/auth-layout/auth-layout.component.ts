import { Router } from '@angular/router';
import { AuthCoreService } from './../core/services/authCore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {


  constructor(
    private authCoreServ: AuthCoreService,
    private router: Router
  ) { }

  ngOnInit() {
    const _id = localStorage.getItem('_id')
    const token = localStorage.getItem('token')
      
    if(token && _id){
      this.authCoreServ.setId(_id)
      this.router.navigate(['choise'])
    }
    
  }

}
