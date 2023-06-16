
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Secenek } from 'src/app/models/Secenek';
import { Sinav } from 'src/app/models/Sinav';
import { Sonuc } from 'src/app/models/Sonuc';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { UyeCevap } from 'src/app/models/UyeCevap';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-SoruCoz',
  templateUrl: './SoruCoz.component.html',
  styleUrls: ['./SoruCoz.component.css']
})
export class SoruCozComponent implements OnInit {
  uyeId!: number;
  sinavId!: number;
  secSinav!: Sinav;
  sorular!: Soru[];
  cevaplar: Secenek[] = [];

  soruNumarasi: number = 0;
  radioRenk: ThemePalette = "primary";
  sayacRenk: string = 'color: green;';

  remainingMinutes!: number; // Başlangıç dakika
  remainingSeconds: number = 0; // Başlangıç saniye
  toplamSaniye: number = 0; // Toplam saniye
  sayacUyari1: number = 0; // Uyarı için kullanılacak saniye
  sayacUyari2: number = 0; // Uyarı için kullanılacak saniye
  // 
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

      if (p['sinavId']) {
        this.sinavId = parseInt(p['sinavId']);
        console.log("sinav :", this.sinavId);
        this.apiService.SinavById(this.sinavId).subscribe((d: Sinav) => {
          this.secSinav = d;
          this.remainingMinutes = this.secSinav.sinavSuresi;

        });
        this.SoruListele(this.sinavId);
      } 
    });
    console.log('Process started');
    of(null).pipe(delay(500)).subscribe(() => {
      console.log('Process completed');


      this.uyeId = localStorage.getItem("uId") == null ? 0 : Number(localStorage.getItem("uId"));


      this.toplamSaniye = this.remainingMinutes * 60 + this.remainingSeconds;
      this.sayacUyari1 = this.toplamSaniye / 2;
      this.sayacUyari2 = this.toplamSaniye / 4;
      console.log('Toplam saniye: ' + this.toplamSaniye);
      console.log('Uyarı saniyesi1: ' + this.sayacUyari1);
      console.log('Uyarı saniyesi2: ' + this.sayacUyari2);

      const countdownInterval = setInterval(() => {
        var kalanZaman = this.remainingMinutes * 60 + this.remainingSeconds;
        if (this.sayacUyari2 <= kalanZaman && kalanZaman <= this.sayacUyari1) {
          console.log('Uyarı süresi1');
          this.sayacRenk = 'color: orange;';
        } else if (kalanZaman <= this.sayacUyari2) {
          console.log('Uyarı süresi2');
          this.sayacRenk = 'color: red;';
        }
        if (this.remainingSeconds > 0) {
          this.remainingSeconds--;
        } else {
          if (this.remainingMinutes > 0) {
            this.remainingMinutes--;
            this.remainingSeconds = 59;
          } else {
            this.Sinavibitir(true);
            clearInterval(countdownInterval); // Zamanlayıcıyı durdurmak için doğru argümanı geçiyoruz
          }
        }
      }, 1000); // Her saniye güncelleme yapacak
    });
  }



  BayrakTrue(soru: Soru) {
    return soru.bayrak = true;
  }
  BayrakFalse(soru: Soru) {
    return soru.bayrak = false;
  }

  // Sınav sorularını listeleme
  SoruListele(sınavId: number) {
    this.apiService.SoruSinavListele(sınavId).subscribe((d: any) => {
      this.sorular = d;
      console.log(this.sorular);
    });
  }
  SoruNumarasiArttir() {
    this.soruNumarasi++;
    console.log(this.soruNumarasi);
  }
  SoruNumarasiAzalt() {
    this.soruNumarasi--;
    console.log(this.soruNumarasi);
  }
  Kaydet(secenek: any, soru: Soru) {
    if (secenek) {

      this.cevaplar.push(secenek);
      console.log("kaydet: ", this.cevaplar);
      if (this.soruNumarasi != this.sorular.length - 1) {
        this.soruNumarasi++;
      }
      this.radioRenk = "primary";
      soru.bayrak = true;
      soru.renk = "primary";
    }
  }
  Degistir(secenek: any, soru: Soru) {
    if (secenek) {

      for (let i = 0; i < this.cevaplar.length; i++) {
        if (this.cevaplar[i].secSoruId == secenek.secSoruId) {
          this.cevaplar.splice(i, 1, secenek);

        }
      }
      this.radioRenk = "primary";
      soru.renk = "primary";
      console.log("degistir: ", this.cevaplar);


    }
  }
  Sinavibitir(flag: boolean) {
    if (flag==false) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = "Sınavı Bitirmek istediğinize emin misiniz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {

        for (let i = 0; i < this.cevaplar.length; i++) {
          var uyeCevap = new UyeCevap();
          uyeCevap.uId = this.uyeId;
          uyeCevap.secId = this.cevaplar[i].secenekId;
          
          this.apiService.UyeCevapEkle(uyeCevap).subscribe((s:Sonuc)=>{
            if(s.islem){
              console.log("eklendi");
            }
            else{
              console.log("eklenmedi");
            }
          });
        }

        var s = new Sonuc();
        s.islem = true;
        s.mesaj = "Sınavınız başarıyla tamamlandı.";
        this.alert.AlertUygula(s);
        console.log('Process started');
        of(null).pipe(delay(2000)).subscribe(() => {
          console.log('Process completed');
          location.href = "/";
        });
        

      }
    });
  }else{
    for (let i = 0; i < this.cevaplar.length; i++) {
      var uyeCevap = new UyeCevap();
      uyeCevap.uId = this.uyeId;
      uyeCevap.secId = this.cevaplar[i].secenekId;
      
      this.apiService.UyeCevapEkle(uyeCevap).subscribe((s:Sonuc)=>{
        if(s.islem){
          console.log("eklendi");
        }
        else{
          console.log("eklenmedi");
        }
      });
    }

    var s = new Sonuc();
    s.islem = false;
    s.mesaj = "Sınav süreniz bitmiştir.";
    this.alert.AlertUygula(s);
    console.log('Process started');
    of(null).pipe(delay(2000)).subscribe(() => {
      console.log('Process completed');
      location.href = "/";
    });
  }




  }

  RadioRenkDegistir(s: Soru) {

    s.renk = "accent";

  }



}
