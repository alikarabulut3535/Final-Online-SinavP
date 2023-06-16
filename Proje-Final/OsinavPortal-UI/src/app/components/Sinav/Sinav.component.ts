import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ders } from 'src/app/models/Ders';
import { Sinav } from 'src/app/models/Sinav';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { SinavDialogComponent } from '../dialogs/sinav-dialog/sinav-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Sinav',
  templateUrl: './Sinav.component.html',
  styleUrls: ['./Sinav.component.css']
})
export class SinavComponent implements OnInit {

  sinavlar!: Sinav[];
  dersler!: Ders[];
  secDers!: Ders;
  dersId!: number;

  // tablo ayarları
  dataSource: any;
  displayedColumns = ['sinavAdi', 'sinavSuresi', 'sinavDersId', 'soruSayisi', 'islemler'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Dialog açmak için
  dialogRef!: MatDialogRef<SinavDialogComponent>;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiService: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
    
    
    this.route.params.subscribe(p => {
      
      if (p['dersId']) {
        this.dersId = parseInt(p['dersId']);
        this.DersById(this.dersId);
      }
    });

    this.DersListele();
  }

  SinavListele() {
    this.apiService.SinavDersListele(this.dersId).subscribe((d: Sinav[]) => {
      this.sinavlar = d;
      this.dataSource = new MatTableDataSource(d);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  DersListele() {
    this.apiService.DersListele().subscribe((d: Ders[]) => {
      this.dersler = d;
    });
  }
  DersById(dersId: number) {
    this.apiService.DersById(dersId).subscribe((d: Ders) => {
      this.secDers = d;
      
      this.SinavListele();
    });
  }
  
  DersSec(ders: Ders) {
    this.dersId = ders.dersId
    this.secDers = ders;
    this.SinavListele();
  }
  

  Ekle() {
    var yeniKayit: Sinav = new Sinav();
    this.dialogRef = this.matDialog.open(SinavDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiService.SinavEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SinavListele();
          }
        });
      }
    });
  };

  Duzenle(kayit: Sinav) {
    this.dialogRef = this.matDialog.open(SinavDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.sinavAdi = d.sinavAdi;
        kayit.sinavSuresi = d.sinavSuresi;
        kayit.sinavDersId = d.sinavDersId;
        kayit.soruSayisi = d.soruSayisi;
        this.apiService.SinavDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          
          this.SinavListele();
          
        });
      }
    });
  }

  Sil(kayit: Sinav) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.sinavAdi + " adlı sınav silinecektir onaylıyor musunuz?";

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiService.SinavSil(kayit.sinavId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.SinavListele();
          }
        });
      }
    });
  }

}