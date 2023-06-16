import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { Sinav } from 'src/app/models/Sinav';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { SinavDialogComponent } from '../dialogs/sinav-dialog/sinav-dialog.component';
import { UyeDers } from 'src/app/models/UyeDers';

@Component({
  selector: 'app-Sinavlarım',
  templateUrl: './Sinavlarım.component.html',
  styleUrls: ['./Sinavlarım.component.css']
})
export class SinavlarımComponent implements OnInit {
  uyeDersler!: UyeDers[];
  sinavlar!: Sinav[];
  dersler!: Ders[];
  secDers!: Ders;
  dersId!: number;
  uyeId!: number;

  sinavKontrol: boolean = false;

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

    this.uyeId = localStorage.getItem("uId") == null ? 0 : Number(localStorage.getItem("uId"));
    
   
    this.UyeDersListele();
  }

  SinavListele() {
    this.apiService.SinavDersListele(this.dersId).subscribe((d: Sinav[]) => {
      this.sinavlar = d;
      for (let i = 0; i < this.sinavlar.length; i++) {
        this.apiService.UyeCevapListeleBySinavId(this.uyeId,this.sinavlar[i].sinavId).subscribe((d: any) => {
          console.log(d);
          if (d.length > 0) {
            this.sinavlar[i].sinavBayrak = true;
          }
        }
        );
        
      }
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
  UyeDersListele() {
    this.apiService.UyeDersListele(this.uyeId).subscribe(d => {
      this.uyeDersler = d;
      this.dataSource = new MatTableDataSource(this.uyeDersler);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
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
  Onay(sinavId: number) {
    // confrimDialog açmak için
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Sınavı başlatmak istediğinize emin misiniz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        console.log("sınav başlatıldı");
        location.href = "/sorucoz/" + sinavId;
      }
    }
    );

  }

  

  

}
