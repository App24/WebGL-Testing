import { loadFile } from "../Utilities";
import { Color } from "./Color";
import { Material } from "./Material";

export class Mtl {
    public MaterialList: Material[];

    public constructor() {
        this.MaterialList = [];
    }

    public LoadMtlFile(path: string) {
        const file = loadFile(path);
        this.LoadMtl(file.split("\n"));
    }

    public LoadMtl(data: string[]) {
        data.forEach(line => {
            this.processLine(line);
        });
    }

    private currentMaterial() {
        if (this.MaterialList.length > 0) return this.MaterialList[this.MaterialList.length - 1];
        return new Material();
    }

    private processLine(line: string) {
        const parts = line.split(' ').filter((c) => c !== '');

        if (parts.length > 0) {
            let material = this.currentMaterial();
            let color = new Color();
            switch(parts[0]){
                case "newmtl":
                material = new Material();
                material.name = parts[1];
                this.MaterialList.push(material);
                break;
                case "Ka":
                    color.loadFromStringArray(parts);
                    material.AmbientReflectivity = color;
                    break;
                case "Kd":
                    color.loadFromStringArray(parts);
                    material.DiffuseReflectivity = color;
                    break;
                case "Ks":
                    color.loadFromStringArray(parts);
                    material.SpecularReflectivity = color;
                    break;
                case "Ke":
                    color.loadFromStringArray(parts);
                    material.EmissiveCoefficient = color;
                    break;
                case "Tf":
                    color.loadFromStringArray(parts);
                    material.TransmissionFilter = color;
                    break;
                case "Ni":
                    material.OpticalDensity = Number(parts[1]);
                    break;
                case "d":
                    material.Dissolve = Number(parts[1]);
                    break;
                case "illum":
                    material.IlluminationModel = Number(parts[1]);
                    break;
                case "Ns":
                    material.SpecularExponent = Number(parts[1]);
            }
        }
    }
}