import { AuthCoreService } from './../../../core/services/authCore.service';
import { Material } from './../../../shared/classes/material';
import { UserService } from './../../../core/services/user.service';
import { Photo } from './../../../shared/interfaces';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-avatar-pop-up',
  templateUrl: './avatar-pop-up.component.html',
  styleUrls: ['./avatar-pop-up.component.scss']
})
export class AvatarPopUpComponent implements OnInit, OnDestroy {
  file: File
  photo: Photo
  loader: boolean = false

  constructor(
    public dialogRef: MatDialogRef<AvatarPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userServ: UserService,
    private Material: Material,
    private authCoreServ: AuthCoreService

  ) {}

  ngOnInit() {
    
      const reader = new FileReader()

      this.file = this.data.target.files[0]
      this.photo = {}
      reader.readAsDataURL(this.data.target.files[0])

      reader.onload = () => {
        this.photo.photo = reader.result as string
      }
    
  }

  ngOnDestroy(){}

  cancel(){
    this.dialogRef.close()
  }
  saveAvatar(){
    this.loader = true
    const data = new FormData()
    
    data.append('avatar', this.file, this.file.name)
    

    this.userServ.editAvatar(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        res =>  {
          this.authCoreServ.setUser(res)
          this.Material.openSnackBar('Сохранено')
          this.loader = false
          this.dialogRef.close()
        },
        err => {
          this.loader = false
          this.Material.openSnackBar('Ошибка ' + err)
        }
      )
  }
}
