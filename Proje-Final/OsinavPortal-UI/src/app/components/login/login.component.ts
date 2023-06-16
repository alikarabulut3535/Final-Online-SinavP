import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
  }
  /*
  OturumAc(kadi: string, parola: string) {
    var s: Sonuc = new Sonuc();
    this.apiServis.TokenAl(kadi, parola).subscribe((d:any) => {
      localStorage.setItem("token", d.access_token);
      localStorage.setItem("uId", d.uyeId);
      localStorage.setItem("kadi", d.uyeKadi);
      localStorage.setItem("adsoyad", d.adsoyad);
      localStorage.setItem("uyeYetkileri", d.uyeYetkileri);
      s.islem = true;
      s.mesaj = "Giriş Başarılı";
      this.alert.AlertUygula(s);
      location.href = "/";
      
    }, err => {
      
      s.islem = false;
      s.mesaj = "Kullanıcı adı veya parola hatalıdır!";
      this.alert.AlertUygula(s);
    });
  }*/
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })
  OturumAc(kadi: string, parola: string) {
    this.apiServis.TokenAl(kadi, parola).subscribe({
      next: (d: any) => {
        localStorage.setItem("token", d.access_token);
        localStorage.setItem("uId", d.uyeId);
        localStorage.setItem("kadi", d.uyeKadi);
        localStorage.setItem("adsoyad", d.adsoyad);
        localStorage.setItem("uyeYetkileri", d.uyeYetkileri);
        const s: Sonuc = {
          islem: true,
          mesaj: "Giriş Başarılı"
        };
        this.alert.AlertUygula(s);
        location.href = "/";
      },
      error: (err) => {
        const s: Sonuc = {
          islem: false,
          mesaj: "Kullanıcı adı veya parola hatalıdır!"
        };
        this.alert.AlertUygula(s);
      }
    });
  }

}
