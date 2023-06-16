import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  uyeYetkileri!: string;
  Admin!:string;
  adsoyad!: string;
  constructor(
    // alert servisi oluşturduk
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.UyeAL();
  }

  AlertAc(p: boolean) {
    var s: Sonuc = new Sonuc();
    s.islem = p;
    s.mesaj = "Alert test mesajı";
    this.alert.AlertUygula(s);
  }

  ConfirmAc() {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '300px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Silme işlemini onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      console.log(d);
    });
  }



  UyeAL(){
    this.adsoyad = localStorage.getItem("adsoyad")!;
    this.uyeYetkileri = JSON.parse(localStorage.getItem("uyeYetkileri")!);
      this.Admin = this.uyeYetkileri[0]
      console.log(this.Admin);
  }
}
