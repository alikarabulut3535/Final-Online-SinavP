import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { Sinav } from 'src/app/models/Sinav';
import { UyeDers } from 'src/app/models/UyeDers';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { SonucDialogComponent } from '../dialogs/sonuc-dialog/sonuc-dialog.component';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { UyeCevap } from 'src/app/models/UyeCevap';

@Component({
  selector: 'app-Sonuclarim',
  templateUrl: './Sonuclarim.component.html',
  styleUrls: ['./Sonuclarim.component.css']
})
export class SonuclarimComponent implements OnInit {


  uyeDersler: UyeDers[] = [];
  uyeId!: number;
  sinavlar: Sinav[] = [];
  secDers!: Ders;

  sonucDialogRef!:MatDialogRef<SonucDialogComponent>;
  constructor(
    public apiService: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {


    this.uyeId = localStorage.getItem("uId") == null ? 0 : Number(localStorage.getItem("uId"));

    this.UyeDersListele();
  }



  UyeDersListele() {
    this.apiService.UyeDersListele(this.uyeId).subscribe(d => {
      this.uyeDersler = d;
      console.log("Uyeders SAyısı: ",this.uyeDersler.length);
      
    });
    of(null).pipe(delay(1000)).subscribe(() => {
      this.SinavListele();
    });
    
  }

  SinavListele() {
    for (let i = 0; i < this.uyeDersler.length; i++) {
      
      this.apiService.SinavDersListele(this.uyeDersler[i].dId).subscribe((d: Sinav[]) => {
        
        d.forEach((element:Sinav) => {
          of(null).pipe(delay(1000)).subscribe(() => {
            this.CevapListele(element);
          });
        }); 
        
      });
    }
    
  }
  CevapListele(sinav: Sinav) {
    this.apiService.UyeCevapListeleBySinavId(this.uyeId,sinav.sinavId).subscribe((a: UyeCevap[]) => {
              
      if (a.length > 0) {
        sinav.sinavBayrak = true;
        
        sinav.dSay = a.filter((x: UyeCevap) => x.secenekBilgi.cevap == 1).length;
        sinav.ySay = a.filter((x: UyeCevap) => x.secenekBilgi.cevap == 0).length;
        sinav.bSay = sinav.soruSayisi - (sinav.dSay + sinav.ySay);
        sinav.puan =  Math.round((sinav.dSay * 100) / sinav.soruSayisi);
        // puanı yuvarla
       
        this.sinavlar.push(sinav);
        
      }
    });
  }

  DersById(sinav: Sinav) {
    this.apiService.DersById(sinav.sinavDersId).subscribe((d: Ders) => {
      sinav.dersAdi = d.dersAdi;
      return sinav;
      
    }); 
  }

  SonucGoster(sinav: Sinav) {
    this.sonucDialogRef = this.matDialog.open(SonucDialogComponent, {
      width: '600px',
      data: {
        kayit: sinav,
        uyeId: this.uyeId
      }
    });
  }


}
