import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../uye-dialog/uye-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-uyeListele-dialog',
  templateUrl: './uyeListele-dialog.component.html',
  styleUrls: ['./uyeListele-dialog.component.css']
})
export class UyeListeleDialogComponent implements OnInit {
  uyeler!: Uye[]; //Uye tipinde bir dizi tanımladık
  
  displayedColumns=['adsoyad','mail','parola','admin','uyeDersSayisi','islemler']
  dataSource:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<UyeDialogComponent> 
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

  UyeSec( uye: Uye) {
    this.dialogRef.close(uye);
  }

}
