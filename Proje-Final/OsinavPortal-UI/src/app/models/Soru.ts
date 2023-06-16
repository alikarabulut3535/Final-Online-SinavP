import { ThemePalette } from "@angular/material/core";
import { Secenek } from "./Secenek";

export class Soru {
    soruId!: number;
    soruText!: string;
    soruSinavId!: number;
    secenekler!: Secenek[];
    bayrak: boolean = false;
    dogruSec?: Secenek;
    renk: ThemePalette="primary";
    
    
}
