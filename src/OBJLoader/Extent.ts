export class Extent {
    public XMax: number;
    public XMin: number;
    public YMax: number;
    public YMin: number;
    public ZMax: number;
    public ZMin: number;

    public get XSize(){
        return this.XMax - this.XMin;
    }

    public get YSize(){
        return this.YMax - this.YMin;
    }

    public get ZSize(){
        return this.ZMax - this.ZMin;
    }
}