import { Ders } from "./Ders";
import { Secenek } from "./Secenek";
import { Sinav } from "./Sinav";
import { Soru } from "./Soru";
import { Uye } from "./Uye";

export class UyeCevap {
    uyeCevapId!: number;
    uId!: number;
    secId!: number;
    //uyeBilgi!: Uye;
    secenekBilgi!: Secenek;
    soruBilgi!: Soru;
    sinavBilgi!: Sinav;
    //dersBilgi!: Ders;
}
