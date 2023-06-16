import { Ders } from './../../../models/Ders';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sinav } from 'src/app/models/Sinav';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sinav-dialog',
  templateUrl: './sinav-dialog.component.html',
  styleUrls: ['./sinav-dialog.component.css']
})
export class SinavDialogComponent implements OnInit {

  dialogBaslik!: string;
  islem!: string;
  frm!:FormGroup
  yeniKayit!: Sinav;
  dersler!: Ders[];
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public formBuild: FormBuilder,
    public dialogRef: MatDialogRef<SinavDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == "ekle") {
      this.dialogBaslik = "Sınav Ekle";
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Sınav Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.DersListele();
  }
  DersListele() {
    this.apiServis.DersListele().subscribe((d: Ders[]) => {
      this.dersler = d;
    });
  }
  FormOlustur() {
    return this.formBuild.group({
      sinavAdi: [this.yeniKayit.sinavAdi],
      sinavSuresi: [this.yeniKayit.sinavSuresi],
      sinavDersId: [this.yeniKayit.sinavDersId],
 
    });
  }

}
