
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { Secenek } from 'src/app/models/Secenek';
import { Sinav } from 'src/app/models/Sinav';
import { Soru } from 'src/app/models/Soru';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { SoruDialogComponent } from '../dialogs/soru-dialog/soru-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { SecenekDialogComponent } from '../dialogs/secenek-dialog/secenek-dialog.component';
import { Ders } from 'src/app/models/Ders';



@Component({
  selector: 'app-Soru',
  templateUrl: './Soru.component.html',
  styleUrls: ['./Soru.component.css'],
  
})
export class SoruComponent implements OnInit {
  
  public sorular!:Soru[];
  secenekler!:Secenek[];
  secSinav?: Sinav;
  secSecenek!: Secenek;
  sinavId!: number;
  soruId!: number;
  secDers!: Ders;
  secBayrak: boolean = false;

  soruDialogRef!:MatDialogRef<SoruDialogComponent>;
  secenekDialogRef!:MatDialogRef<SecenekDialogComponent>;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

  @ViewChild(MatAccordion) accordion: MatAccordion = new MatAccordion() ;

  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe(p => {
      
      if (p['sinavId']) {
        this.sinavId = parseInt(p['sinavId']);
        this.SinavById(this.sinavId);
        this.SoruListele();
      }
    });
  }
  // ********************** Radio Başla ********************** // 
  RadioDisabled(cevap:number,bayrak:boolean) {
    if(cevap==0 && bayrak==false){
      return true;
    }
    else{
      return false;
    }
    
  }
  BayrakTrue(soru:Soru){
    return soru.bayrak=true;
  }
  BayrakFalse(soru:Soru){
    return soru.bayrak=false;
  }
  SecenekleriSifirla(soru:Soru){
    soru.secenekler.forEach(secenek => {
 
      secenek.cevap=0;
      
      this.apiServis.SecenekDuzenle(secenek).subscribe((s:Sonuc)=>{
        console.log(s);
        if(s.islem){
          this.apiServis.SecenekSoruListele(soru.soruId).subscribe((s: Secenek[]) => {
            for (let i = 0; i < this.sorular.length; i++) {
              if(this.sorular[i].soruId==soru.soruId){
                this.sorular[i].secenekler=s;
              }
            }
        });
        }
      });
    });
  }
  SecenekleriKaydet(soru:Soru){
    if(soru.dogruSec==null){
      this.alert.AlertUygula({islem:false,mesaj:"Seçilmiş doğru bir seçenek Bulunmamaktadır."});
    }else{
      
      soru.dogruSec.cevap=1;
      this.apiServis.SecenekDuzenle(soru.dogruSec).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.apiServis.SecenekSoruListele(soru.soruId).subscribe((s: Secenek[]) => {
            for (let i = 0; i < this.sorular.length; i++) {
              if(this.sorular[i].soruId==soru.soruId){
                this.sorular[i].secenekler=s;
              }
            }
        });
        }
      }
      );

    }
  }
  RadioEnabled(){
    this.secBayrak=true;
  }
  Checked(sec:Secenek){
    if(sec.cevap==1){
      return true;
    }
    else{
      return false;
    }
  }
  // ********************** Radio bitir ********************** // 

  
  // ********************** Soru Başla ********************** // 
  SoruListele() {
    this.apiServis.SoruSinavListele(this.sinavId).subscribe((d: Soru[]) => {
      this.sorular = d;
      /*
      for (let i = 0; i < this.sorular.length; i++) {
        for( let secenek of this.sorular[i].secenekler){
          if(secenek.cevap==1){
            this.sorular[i].dogruSec=secenek;
          }
        } 
        
      }*/
      for (let i = 0; i < this.sorular.length; i++) {
        this.sorular[i].secenekler.forEach(secenek => {
          if(secenek.cevap==1){
            this.sorular[i].dogruSec=secenek;
          }
        });
      }
      console.log("soru listeleme")
      console.log(this.sorular);
    });
  }
  SoruEkle() {
    var yeniKayit:Soru=new Soru();
    yeniKayit.soruSinavId=this.sinavId;
    this.soruDialogRef=this.matDialog.open(SoruDialogComponent,{
      width:'800px',
      height:'500px',
      data:{
        kayit:yeniKayit,
        islem:'ekle',
        
      }
    });
    this.soruDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.SoruEkle(d).subscribe(s=>{
          
          this.alert.AlertUygula(s);
          if(s.islem){
            this.SoruListele();
            this.SinavById(this.sinavId);
          }
        });
      }
    });
  }
  SoruDuzenle(kayit:Soru){
    this.soruDialogRef=this.matDialog.open(SoruDialogComponent,{
      width:'800px',
      height:'500px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.soruDialogRef.afterClosed().subscribe((d:Soru)=>{
      if(d){
        d.soruId=kayit.soruId;
        
        this.apiServis.SoruDuzenle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.SoruListele();
          }
        });
      }
    });
  }
  SoruSil(kayit:Soru){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=" Seçtiğiniz Soru silinecektir onaylıyor musunuz ?";

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.SoruSil(kayit.soruId).subscribe(s=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.SoruListele();
            this.SinavById(this.sinavId);
          }
        });
      }
    });
  }
  // ********************** Soru Bitir ********************** // 

  // ********************** Secenek Başla ********************** //

  SecenekEkle(soru:Soru){
    var yeniKayit:Secenek=new Secenek();
    yeniKayit.secSoruId=soru.soruId;
    yeniKayit.cevap=0;
    this.secenekDialogRef=this.matDialog.open(SecenekDialogComponent,{
      width:'400px',
      
      data:{
        kayit:yeniKayit,
        islem:'ekle',
        
      }
    });
    this.secenekDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.SecenekEkle(d).subscribe(s=>{
          if(s.islem==false){
            this.alert.AlertUygula(s);
          }
          else{
            this.apiServis.SecenekSoruListele(soru.soruId).subscribe((d: Secenek[]) => {
              for (let i = 0; i < this.sorular.length; i++) {
                if(this.sorular[i].soruId==soru.soruId){
                  this.sorular[i].secenekler=d;
                }
              }
          });
          }
        });
      }
    
    });
  }
  SecenekDuzenle(kayit:Secenek){
    this.secenekDialogRef=this.matDialog.open(SecenekDialogComponent,{
      width:'400px',
      
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.secenekDialogRef.afterClosed().subscribe((d:Secenek)=>{
      if(d){
        d.secenekId=kayit.secenekId;
        
        this.apiServis.SecenekDuzenle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.apiServis.SecenekSoruListele(d.secSoruId).subscribe((s: Secenek[]) => {
              for (let i = 0; i < this.sorular.length; i++) {
                if(this.sorular[i].soruId==kayit.secSoruId){
                  this.sorular[i].secenekler=s;
                }
              }
          });
          }
        });
      }
    });
  }
  SecenekSil(kayit:Secenek){
    
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=" Seçtiğiniz Seçenek silinecektir onaylıyor musunuz ?";

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      
      if(d){
        var id =kayit.secSoruId;
        this.apiServis.SecenekSil(kayit.secenekId).subscribe(s=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.apiServis.SecenekSoruListele(id).subscribe((s: Secenek[]) => {
              for (let i = 0; i < this.sorular.length; i++) {
                if(this.sorular[i].soruId==kayit.secSoruId){
                  this.sorular[i].secenekler=s;
                }
              }
          });
          }
        });
      }
    });
  }
  // ********************** Secenek Bitir ********************** // 
  SinavById(sinavId: number) {
    this.apiServis.SinavById(sinavId).subscribe((d: Sinav) => {
      this.secSinav = d;
      this.DersById(this.secSinav.sinavDersId);
    });
  }
  DersById(dersId: number) {
    this.apiServis.DersById(dersId).subscribe((d: Ders) => {
      this.secDers = d;
      
    });
  }

}
