import { IType } from "./IType";

export class Color implements IType{
    public r:number;
    public g : number;
    public b: number;

    public constructor(){
        this.r = 1;
        this.g = 1;
        this.b = 1;
    }
    
    loadFromStringArray(data: string[]): void {
        if(data.length !== 4) return;
        this.r = Number(data[1]);
        this.g = Number(data[2]);
        this.b = Number(data[3]);
    }
}