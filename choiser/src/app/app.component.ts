import { Router } from '@angular/router';
import { AuthCoreService } from './core/services/authCore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private auth: AuthCoreService,
    private router: Router
  ){}

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    const _id = localStorage.getItem('_id')   
    if (token) {
      this.auth.setToken(token)
      this.auth.setId(_id)
    }
  }
}
