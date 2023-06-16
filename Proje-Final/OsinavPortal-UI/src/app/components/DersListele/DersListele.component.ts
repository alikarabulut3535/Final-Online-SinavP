import { MatTableDataSource } from '@angular/material/table';
import { Uye } from './../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UyeDers } from 'src/app/models/UyeDers';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Ders } from 'src/app/models/Ders';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-DersListele',
  templateUrl: './DersListele.component.html',
  styleUrls: ['./DersListele.component.css']
})
export class DersListeleComponent implements OnInit {

  uyeDersler!: UyeDers[];
  dersler!:Ders[];
  secUye?: Uye;
  uyeId!: number;
  dersId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Dialog açmak için
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>

  // tablo ayarları
  displayedColumns = ['dersKodu', 'dersAdi', 'dersKredi', 'islemler'];
  dataSource: any;

  constructor(
    public alert: MyAlertService,
    public apiService: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {

        this.uyeId = p["uyeId"];
        this.UyeGetir();
        this.UyeDersListele();
        this.DersListele();
      }
    })
  }

  UyeGetir() {
    this.apiService.UyeById(this.uyeId).subscribe((d: Uye) => {
      this.secUye = d;

    });
  }

  UyeDersListele() {
    this.apiService.UyeDersListele(this.uyeId).subscribe(d => {
      this.uyeDersler = d;
      this.dataSource = new MatTableDataSource(this.uyeDersler);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  DersListele() {
    this.apiService.DersListele().subscribe((d: Ders[]) => {
      this.dersler = d;
    });
  }

  DersSec(dersId: number) {
    this.dersId = dersId;
  }
  Kaydet() {
    if (this.dersId==0){
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Ders Seçiniz!"; 
      this.alert.AlertUygula(s);
      
      
    }
    else {

      var uyeDers: UyeDers = new UyeDers();
      uyeDers.dId = this.dersId;
      uyeDers.uId = this.uyeId;
      
      this.apiService.UyeDersEkle(uyeDers).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.UyeDersListele();
        }});
    }
  }

  Sil(kayit: UyeDers) {
   
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
      height: '300px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Üyeden, "+kayit.dersBilgi.dersAdi + " Dersini Silmek İstediğinizden Emin Misiniz ?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiService.UyeDersSil(kayit.uyedersId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeDersListele();
          }
        });
      }});
  }


}



