import { IType } from "./IType";

const MinimumDataLength = 4;
const Prefix = "f";

export class Face implements IType {
    public UseMtl: string;
    public VertexIndexList: number[];
    public TextureVertexIndexList: number[];
    public NormalVertexIndexList: number[];

    loadFromStringArray(data: string[]): void {
        if (data.length < MinimumDataLength)
            throw new Error("Input array must be of minimum length " + MinimumDataLength);

        if (data[0].toLowerCase() !== Prefix)
            throw new Error("Data prefix must be '" + Prefix + "'");

        const vcount = data.length - 1;
        this.VertexIndexList = [];
        this.TextureVertexIndexList = [];
        this.NormalVertexIndexList = [];

        let success = false;

        for (let i = 0; i < vcount; i++) {
            const parts = data[i + 1].split('/');

            let vindex = Number(parts[0]);
            success = !isNaN(vindex);
            if (!success) throw new Error("Could not parse parameter as int");

            this.VertexIndexList.push(vindex);

            let temp = 0;

            if (parts.length >= 2) {
                vindex = Number(parts[1]);
                success = !isNaN(vindex);
                if (success) {
                    temp = vindex;
                }
            }
            this.TextureVertexIndexList.push(temp);

            temp = 0;

            if(parts.length >= 3){
                vindex = Number(parts[2]);
                success = !isNaN(vindex);
                if (success) {
                    temp = vindex;
                }
            }

            this.NormalVertexIndexList.push(temp);
        }
    }

}