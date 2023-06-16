import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { UyeListeleDialogComponent } from '../dialogs/uyeListele-dialog/uyeListele-dialog.component';

@Component({
  selector: 'app-UyeListele',
  templateUrl: './UyeListele.component.html',
  styleUrls: ['./UyeListele.component.css']
})
export class UyeListeleComponent implements OnInit {
  uyeDersler!: UyeDers[];
  uyeler!:Uye[];
  secDers?: Ders;
  dersId!: number;
  uyeId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Dialog açmak için
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>
  dialogRef!:MatDialogRef<UyeListeleDialogComponent>

  // tablo ayarları
  displayedColumns = ['adsoyad', 'mail', 'islemler'];
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

        this.dersId = p["dersId"];
        this.DersGetir();
        this.DersUyeListele();
        this.UyeListele();
      }
    })
  }

  DersGetir() {
    this.apiService.DersById(this.dersId).subscribe((d: Ders) => {
      this.secDers = d;

    });
  }

  DersUyeListele() {
    this.apiService.DersUyeListele(this.dersId).subscribe(d => {
      this.uyeDersler = d;
      this.dataSource = new MatTableDataSource(this.uyeDersler);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  UyeListele() {
    this.apiService.UyeListele().subscribe((d: Uye[]) => {
      this.uyeler = d;
    });
  }

  UyeSec(uyeId: number) {
    this.uyeId = uyeId;
  }
  Ekle() {
    this.dialogRef = this.matDialog.open(UyeListeleDialogComponent, {
      width: '800px',
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var uyeDers = new UyeDers();
        uyeDers.dId = this.dersId;
        uyeDers.uId = d.uyeId;
        this.apiService.UyeDersEkle(uyeDers).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersUyeListele();
          }
        });
      }
    } );
  }

  Sil(kayit: UyeDers) {
   
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
      
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Dersten, "+kayit.uyeBilgi.adsoyad + " adli Üyeyi Silmek İstediğinizden Emin Misiniz ?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiService.UyeDersSil(kayit.uyedersId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.DersUyeListele();
          }
        });
      }});
  }



}
