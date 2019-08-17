import { Material } from '../../../../shared/classes/material';
import { User } from '../../../../shared/interfaces';
import { UserService } from '../../../../core/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-delete-confirm-popup',
  templateUrl: './delete-confirm-popup.component.html',
  styleUrls: ['./delete-confirm-popup.component.scss']
})
export class DeleteConfirmPopupComponent implements OnInit, OnDestroy {

  nickname: string = ''

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService,
    private router: Router,
    private material: Material
  ) { }

  ngOnInit() {}
  ngOnDestroy(){}

  cancel(){
    this.dialogRef.close()
  }
  delete(){
    if(this.nickname == this.user.nickname){
      this.userService.deleteUser(this.user._id)
        .pipe(untilDestroyed(this))
        .subscribe(
          res => {
            this.material.openSnackBar('Ваш акаунт удален')
            this.router.navigate(['login'])
        }, 
          err => this.material.openSnackBar(`Ошибка: ${err.message}`),
          () => this.dialogRef.close())
      
    }else {
      this.nickname = ''
      this.material.openSnackBar('У вас не такой ник')
    }
    
  }

}
