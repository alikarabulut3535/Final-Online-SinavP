import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik!: string;
  islem!: string;
  frm!:FormGroup
  yeniKayit!: Uye;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public formBuild: FormBuilder,
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Üye Ekle";
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Üye Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.formBuild.group({
      adsoyad: [this.yeniKayit.adsoyad],
      mail: [this.yeniKayit.mail],
      parola: [this.yeniKayit.parola],
      admin: [this.yeniKayit.admin]
    });
  }
}
