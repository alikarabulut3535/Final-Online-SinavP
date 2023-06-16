import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit{
  adsoyad!: string;
  uyeYetkileri!: string;
  Admin!:string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiServis: ApiService,
    ) {}
  ngOnInit(): void {
    if(this.apiServis.OturumKontrol()){
      this.adsoyad = localStorage.getItem("adsoyad")!;
      this.uyeYetkileri = JSON.parse(localStorage.getItem("uyeYetkileri")!);
      this.Admin = this.uyeYetkileri[0]
      console.log(this.uyeYetkileri);
      console.log(this.Admin);
    }
  }

  OturumKapat(){
    localStorage.clear();
    location.href="/login";
  }

}
