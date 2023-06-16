import { MatTableDataSource } from '@angular/material/table';
//import { Uye } from './../../models/Uye';
import {Uye} from 'src/app/models/Uye'
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-Uye',
  templateUrl: './Uye.component.html',
  styleUrls: ['./Uye.component.css']
})
export class UyeComponent implements OnInit {
  uyeler!: Uye[]; //Uye tipinde bir dizi tanımladık
  displayedColumns=['adsoyad','mail','parola','admin','uyeDersSayisi','islemler']
  dataSource:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  uyeDialogRef!: MatDialogRef<UyeDialogComponent>;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.UyeListele();
  }
  // UyeListele dataSource ile birlikte çalışacak şekilde değiştirildi
  UyeListele() {
    this.apiServis.UyeListele().subscribe(d => {
      this.uyeler = d as Uye[];
      this.dataSource = new MatTableDataSource(this.uyeler);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  Filtrele(e:any){
    var deger=e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    } 
  }

  Ekle(){
    var yeniKayit:Uye=new Uye();
    this.uyeDialogRef=this.matDialog.open(UyeDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.uyeDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.UyeEkle(d).subscribe(s=>{
          
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UyeListele();
          }
        });
      }
    });
  }

  Duzenle(kayit:Uye){
    this.uyeDialogRef=this.matDialog.open(UyeDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.uyeDialogRef.afterClosed().subscribe((d:Uye)=>{
      if(d){
        kayit.adsoyad=d.adsoyad;
        kayit.mail=d.mail;
        kayit.parola=d.parola;
        kayit.admin=d.admin;

        this.apiServis.UyeDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(!s.islem){
            this.UyeListele();
          }
        });
      }
    });
  }

  Sil(kayit:Uye){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.adsoyad+" adlı üye silinecektir onaylıyor musunuz ?";

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.UyeSil(kayit.uyeId).subscribe(s=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UyeListele();
          }
        });
      }
    });
  }
}
