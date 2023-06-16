
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/Home/Home.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { MaterialModule } from './material.module';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UyeComponent } from './components/Uye/Uye.component';
import { DersComponent } from './components/Ders/Ders.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DersListeleComponent } from './components/DersListele/DersListele.component';
import { DersDialogComponent } from './components/dialogs/ders-dialog/ders-dialog.component';
import { UyeListeleComponent } from './components/UyeListele/UyeListele.component';
import { UyeListeleDialogComponent } from './components/dialogs/uyeListele-dialog/uyeListele-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';
import { SinavComponent } from './components/Sinav/Sinav.component';
import { SinavDialogComponent } from './components/dialogs/sinav-dialog/sinav-dialog.component';
import { AuthInterceptor } from './services/AuthInterceptor';
import { SoruComponent } from './components/Soru/Soru.component';
import { SoruDialogComponent } from './components/dialogs/soru-dialog/soru-dialog.component';
import { SecenekDialogComponent } from './components/dialogs/secenek-dialog/secenek-dialog.component';
import { DerslerimComponent } from './components/Derslerim/Derslerim.component';
import { SinavlarımComponent } from './components/Sinavlarım/Sinavlarım.component';
import { SoruCozComponent } from './components/SoruCoz/SoruCoz.component';
import { SonuclarimComponent } from './components/Sonuclarim/Sonuclarim.component';
import { SonucDialogComponent } from './components/dialogs/sonuc-dialog/sonuc-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UyeComponent,
    DersComponent,
    DersListeleComponent,
    UyeListeleComponent,
    LoginComponent,
    SinavComponent,
    SoruComponent,
    DerslerimComponent,
    SinavlarımComponent,
    SoruCozComponent,
    SonuclarimComponent,
    

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    DersDialogComponent,
    UyeListeleDialogComponent,
    SinavDialogComponent,
    SoruDialogComponent,
    SecenekDialogComponent,
    SonucDialogComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  // veri alışverişi beklenen componentler
  entryComponents: [
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    DersDialogComponent,
    UyeListeleDialogComponent,
    SinavDialogComponent,
    SoruDialogComponent,
    SecenekDialogComponent,
    SonucDialogComponent
    
  ],
  providers: [MyAlertService,ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
