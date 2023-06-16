import { UyeCevap } from './../models/UyeCevap';
import { Uye } from './../models/Uye';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ders } from '../models/Ders';
import { Sonuc } from '../models/Sonuc';
import { UyeDers } from '../models/UyeDers';
import { Sinav } from '../models/Sinav';
import { Soru } from '../models/Soru';
import { Secenek } from '../models/Secenek';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44322/api/"
  constructor(
    public http: HttpClient
  ) { }

  // Token işlemleri
  TokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
    return this.http.post(this.apiUrl + "token", data, reqHeader);
  }

  // Oturum Kontrolü
  OturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  // Uye işlemleri
  UyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + "uyelistele");
  }
  UyeById(uyeId: number) {
    return this.http.get<Uye>(this.apiUrl + "uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post<Sonuc>(this.apiUrl + "uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put<Sonuc>(this.apiUrl + "uyeduzenle", uye);
  }
  UyeSil(uyeId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "uyesil/" + uyeId);
  }
  // Ders işlemleri
  DersListele() {
    return this.http.get<Ders[]>(this.apiUrl + "derslistele");
  }
  DersById(dersId: number) {
    return this.http.get<Ders>(this.apiUrl + "dersbyid/" + dersId);
  }
  DersEkle(ders:Ders){
    return this.http.post<Sonuc>(this.apiUrl+"dersekle",ders);
  }
  DersDuzenle(ders:Ders){
    return this.http.put<Sonuc>(this.apiUrl+"dersduzenle",ders);
  }
  DersSil(dersId:number){
    return this.http.delete<Sonuc>(this.apiUrl+"derssil/"+dersId);
  }

  // UyeDers işlemleri
  UyeDersListele(uyeId: number) {
    return this.http.get<UyeDers[]>(this.apiUrl + "uyederslistele/" + uyeId);
  }
  DersUyeListele(dersId: number) {
    return this.http.get<UyeDers[]>(this.apiUrl + "dersuyelistele/" + dersId);
  }
  UyeDersEkle(uyeDers: UyeDers) {
    return this.http.post<Sonuc>(this.apiUrl + "uyedersekle", uyeDers);
  }
  UyeDersSil(uyeDersId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "uyederssil/" + uyeDersId);
  }

  // Sinav işlemleri
  SinavListele() {
    return this.http.get<Sinav[]>(this.apiUrl + "sinavlistele");
  }
        // sinav ders listele
  SinavDersListele(dersId: number) {
    return this.http.get<Sinav[]>(this.apiUrl + "sinavderslistele/" + dersId);
  }
  SinavById(sinavId: number) {
    return this.http.get<Sinav>(this.apiUrl + "sinavbyid/" + sinavId);
  }
       // sinav soru listele
  SinavSoruListele(sinavId: number) {
    return this.http.get<Soru[]>(this.apiUrl + "sinavsorulistele/" + sinavId);
  }
  SinavEkle(sinav: Sinav) {
    return this.http.post<Sonuc>(this.apiUrl + "sinavekle", sinav);
  }
  SinavDuzenle(sinav: Sinav) {
    return this.http.put<Sonuc>(this.apiUrl + "sinavduzenle", sinav);
  }
  SinavSil(sinavId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "sinavsil/" + sinavId);
  }
  // Soru işlemleri
  SoruListele() {
    return this.http.get<Soru[]>(this.apiUrl + "sorulistele");
  }
  SoruSinavListele(sinavId: number) {
    return this.http.get<Soru[]>(this.apiUrl + "sorusinavlistele/" + sinavId);
  }
  SoruById(soruId: number) {
    return this.http.get<Soru>(this.apiUrl + "sorubyid/" + soruId);
  }
  SoruEkle(soru: Soru) {
    return this.http.post<Sonuc>(this.apiUrl + "soruekle", soru);
  }
  SoruDuzenle(soru: Soru) {
    return this.http.put<Sonuc>(this.apiUrl + "soruduzenle", soru);
  }
  SoruSil(soruId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "sorusil/" + soruId);
  }
  // Secenek işlemleri
  SecenekById(secenekId: number) {
    return this.http.get<Secenek>(this.apiUrl + "secenekbyid/" + secenekId);
  }
  SecenekSoruListele(soruId: number) {
    return this.http.get<Secenek[]>(this.apiUrl + "seceneksorulistele/" + soruId);
  }
  SecenekEkle(secenek: Secenek) {
    return this.http.post<Sonuc>(this.apiUrl + "secenekekle", secenek);
  }
  SecenekDuzenle(secenek: Secenek) {
    return this.http.put<Sonuc>(this.apiUrl + "secenekduzenle", secenek);
  }
  SecenekSil(secenekId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "seceneksil/" + secenekId);
  }
  // Uyecevap işlemleri
  UyeCevapListele(uyeId: number) {
    return this.http.get<UyeCevap[]>(this.apiUrl + "uyecevaplistele/" + uyeId);
  }
  UyeCevapListeleBySinavId(uyeId:number,sinavId: number) {
    return this.http.get<UyeCevap[]>(this.apiUrl + "uyecevaplistelebysinavid/" + uyeId+"/"+sinavId);
  }
  UyeCevapEkle(uyeCevap: UyeCevap) {
    return this.http.post<Sonuc>(this.apiUrl + "uyecevapekle", uyeCevap);
  }
  UyeCevapDuzenle(uyeCevap: UyeCevap) {
    return this.http.put<Sonuc>(this.apiUrl + "uyecevapduzenle", uyeCevap);
  }
  UyeCevapSil(uyeCevapId: number) {
    return this.http.delete<Sonuc>(this.apiUrl + "uyecevapsil/" + uyeCevapId);
  }
}
