import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ders } from 'src/app/models/Ders';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { DersDialogComponent } from '../dialogs/ders-dialog/ders-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-Ders',
  templateUrl: './Ders.component.html',
  styleUrls: ['./Ders.component.css']
})
export class DersComponent implements OnInit {
dersler!:Ders[];
dataSource:any;

dialogRef!:MatDialogRef<DersDialogComponent>;
confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

// tablo ayarları
@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
    displayedColumns = ['dersKodu', 'dersAdi', 'dersKredi','dersOgrSayisi' , 'islemler']

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.DersListele();
  }

  DersListele(){
    this.apiServis.DersListele().subscribe((d:Ders[])=>{
      this.dersler=d;
      this.dataSource=new MatTableDataSource(this.dersler);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    })
  }
  Filtrele(e:any){
    var deger=e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    } 
  }
  Ekle(){
    var yeniKayit:Ders=new Ders();
    this.dialogRef=this.matDialog.open(DersDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.DersEkle(d).subscribe(s=>{
          
          this.alert.AlertUygula(s);
          if(s.islem){
            this.DersListele();
          }
        });
      }
    });
  }
  Duzenle(kayit:Ders){
    this.dialogRef=this.matDialog.open(DersDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:Ders)=>{
      if(d){
        d.dersId=kayit.dersId;
        /*
        kayit.dersAdi=d.dersAdi;
        kayit.dersKodu=d.dersKodu;
        kayit.dersKredi=d.dersKredi;
        */
        this.apiServis.DersDuzenle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.DersListele();
          }
        });
      }
    });
  }

  Sil(kayit:Ders){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.dersAdi+" adlı Ders silinecektir onaylıyor musunuz ?";

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.DersSil(kayit.dersId).subscribe(s=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.DersListele();
          }
        });
      }
    });
  }

}
