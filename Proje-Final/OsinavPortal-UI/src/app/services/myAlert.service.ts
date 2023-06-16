import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from '../models/Sonuc';
import { AlertDialogComponent } from '../components/dialogs/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
  // referans olarak komponenti alıyoruz
  alertDialogRef?: MatDialogRef<AlertDialogComponent> | null;
  constructor(
    public matDialog: MatDialog
  ) { }

  AlertUygula(s: Sonuc) {
    var baslik = "";
    if (s.islem) {
      baslik = "İşlem Başarılı";
    } else {
      baslik = "İşlem Başarısız";
    }


    this.alertDialogRef = this.matDialog.open(AlertDialogComponent, {
      width: '400px'
    });
    // .componentInstance diyerek komponentin içindeki değişkenlere erişebiliriz

    this.alertDialogRef.componentInstance.dialogBaslik = baslik;
    this.alertDialogRef.componentInstance.dialogMesaj = s.mesaj;
    this.alertDialogRef.componentInstance.dialogIslem = s.islem;

    // .afterClosed diyerek komponent kapatıldığında yapılacak işlemleri belirtebiliriz
    this.alertDialogRef.afterClosed().subscribe(d => {
      this.alertDialogRef = null;
    });
  }
}
