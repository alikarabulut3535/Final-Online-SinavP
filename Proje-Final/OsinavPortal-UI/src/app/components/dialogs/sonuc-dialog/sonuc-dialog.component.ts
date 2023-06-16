import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sinav } from 'src/app/models/Sinav';
import { UyeCevap } from 'src/app/models/UyeCevap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sonuc-dialog',
  templateUrl: './sonuc-dialog.component.html',
  styleUrls: ['./sonuc-dialog.component.css']
})
export class SonucDialogComponent implements OnInit {

  kayit!:Sinav;
  uyeId!:number;
  dogruSayisi:number=0;
  yanlisSayisi:number=0;
  bosSayisi:number=0;
  cevaplar:UyeCevap[]=[];
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<SonucDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { 
    this.kayit = data.kayit;
    this.uyeId = data.uyeId;
  }

  ngOnInit() {
    this.SonucListele();
  }

  SonucListele(){
    this.apiServis.UyeCevapListeleBySinavId(this.uyeId,this.kayit.sinavId).subscribe((a: UyeCevap[]) => {
     this.cevaplar = a;
    }
    );
  }
}
