import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-soru-dialog',
  templateUrl: './soru-dialog.component.html',
  styleUrls: ['./soru-dialog.component.css']
})
export class SoruDialogComponent implements OnInit {
  dialogBaslik!: string;
  islem!: string;
  frm!:FormGroup
  yeniKayit!: Soru;
  sinavId!: number;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public formBuild: FormBuilder,
    public dialogRef: MatDialogRef<SoruDialogComponent>,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    
    console.log(data);
    if (this.islem == "ekle") {
      this.dialogBaslik = "Soru Ekle";
    }
    if (this.islem == "duzenle") {
      this.dialogBaslik = "Soru Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    
  }
 
  FormOlustur() {
    return this.formBuild.group({
      soruText: [this.yeniKayit.soruText],
      soruSinavId: [this.yeniKayit.soruSinavId]
 
    });
  }
}
