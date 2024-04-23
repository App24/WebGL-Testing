import { IType } from "./IType";

const MinimumDataLength = 3;
const Prefix = "vt";

export class TextureVertex implements IType {
    public x: number;
    public y: number;

    public Index: number;

    loadFromStringArray(data: string[]): void {
        if (data.length < MinimumDataLength)
            throw new Error("Input array must be of minimum length " + MinimumDataLength);

        if (data[0].toLowerCase() !== Prefix)
            throw new Error("Data prefix must be '" + Prefix + "'");

        let success = false;

        let x = 0;
        let y = 0;

        x = Number(data[1]);
        success = !isNaN(x)
        if (!success)
            throw new Error("Could not parse X parameter as double");

        y = Number(data[2]);
        success = !isNaN(y)
        if (!success)
            throw new Error("Could not parse Y parameter as double");

        this.x = x;
        this.y = y;
    }

}