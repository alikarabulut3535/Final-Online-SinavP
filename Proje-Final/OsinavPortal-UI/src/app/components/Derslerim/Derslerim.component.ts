import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { Sonuc } from 'src/app/models/Sonuc';
import { Uye } from 'src/app/models/Uye';
import { UyeDers } from 'src/app/models/UyeDers';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-Derslerim',
  templateUrl: './Derslerim.component.html',
  styleUrls: ['./Derslerim.component.css']
})
export class DerslerimComponent implements OnInit {

  uyeDersler!: UyeDers[];

  secUye?: Uye;
  uyeId!: number;

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

    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.uyeId = localStorage.getItem("uId") == null ? 0 : Number(localStorage.getItem("uId"));
    console.log(this.uyeId);
    this.UyeGetir();
    this.UyeDersListele();

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
      console.log(this.uyeDersler);
    });
  }





}
