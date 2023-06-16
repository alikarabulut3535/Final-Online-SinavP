import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/Home/Home.component';
import { UyeComponent } from './components/Uye/Uye.component';
import { DersComponent } from './components/Ders/Ders.component';
import { DersListeleComponent } from './components/DersListele/DersListele.component';
import { UyeListeleComponent } from './components/UyeListele/UyeListele.component';
import { LoginComponent } from './components/login/login.component';
import { SinavComponent } from './components/Sinav/Sinav.component';
import { SoruComponent } from './components/Soru/Soru.component';
import { DerslerimComponent } from './components/Derslerim/Derslerim.component';
import { SinavlarımComponent } from './components/Sinavlarım/Sinavlarım.component';
import { SoruCozComponent } from './components/SoruCoz/SoruCoz.component';
import { SonuclarimComponent } from './components/Sonuclarim/Sonuclarim.component';


const routes: Routes = [
   {path: '', component: HomeComponent},
   {path: 'login', component: LoginComponent},
   {path: 'uye', component:UyeComponent},
   {path: 'ders', component:DersComponent},
   {path: 'derslerim', component:DerslerimComponent},
   {path: 'sinav', component:SinavComponent},
   {path: 'sinavlarim', component:SinavlarımComponent},
   {path: 'sinavlarim/:dersId', component:SinavlarımComponent},
   {path: 'sinav/:dersId', component:SinavComponent},
   {path: 'derslistele/:uyeId', component:DersListeleComponent},
   {path: 'uyelistele/:dersId', component:UyeListeleComponent},
   {path: 'sorular/:sinavId', component:SoruComponent},
   {path: 'sorucoz/:sinavId', component:SoruCozComponent},
   {path: 'sonuclarim', component:SonuclarimComponent},
   {path: 'sonuclarim/:sinavId', component:SonuclarimComponent},
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
