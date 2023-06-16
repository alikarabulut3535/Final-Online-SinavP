import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Secenek } from 'src/app/models/Secenek';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';


@Component({
  selector: 'app-secenek-dialog',
  templateUrl: './secenek-dialog.component.html',
  styleUrls: ['./secenek-dialog.component.css']
})
export class SecenekDialogComponent implements OnInit {
  dialogBaslik!: string;
  islem!: string;
  frm!: FormGroup
  yeniKayit!: Secenek;

  

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public formBuild: FormBuilder,
    public dialogRef: MatDialogRef<SecenekDialogComponent>,
    public confirmDialogRef: MatDialogRef<ConfirmDialogComponent>,
    

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    console.log(data);
    if (this.islem == "ekle") {
      this.dialogBaslik = "Seçenek Ekle";
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Seçenek Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {

  }
  // Sil() {
    
  //   // confirm ekranı açılacak
  //   this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
  //     width: '400px'
  //   });
  //   this.confirmDialogRef.componentInstance.dialogMesaj = "Seçenek Silinecektir Onaylıyor musunuz?";
  //   this.confirmDialogRef.afterClosed().subscribe(d => {
  //     if (d) {
  //       this.apiServis.SecenekSil(this.yeniKayit.secenekId).subscribe((s: Sonuc) => {
  //         if (s.islem) {
  //           console.log(this.yeniKayit);
  //           this.soruComponent.SecenekListele(this.yeniKayit.secSoruId);
  //         }
  //       });
  //     }
  //     });
  // }



FormOlustur() {
  return this.formBuild.group({
    secenekText: [this.yeniKayit.secenekText],
    secSoruId: [this.yeniKayit.secSoruId]

  });
}
}
