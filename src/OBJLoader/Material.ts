import { Color } from "./Color";
import { IType } from "./IType";

export class Material implements IType {
    public name: string;
    public AmbientReflectivity: Color;
    public DiffuseReflectivity: Color;
    public SpecularReflectivity: Color;
    public TransmissionFilter: Color;
    public EmissiveCoefficient: Color;
    public SpecularExponent: number;
    public OpticalDensity: number;
    public Dissolve: number;
    public IlluminationModel: number;

    public constructor() {
        this.name = "DefaultMaterial";
        this.AmbientReflectivity = new Color();
        this.DiffuseReflectivity = new Color();
        this.SpecularReflectivity = new Color();
        this.TransmissionFilter = new Color();
        this.EmissiveCoefficient = new Color();
        this.SpecularExponent = 0;
        this.OpticalDensity = 1.0;
        this.Dissolve = 1.0;
        this.IlluminationModel = 0;
    }

    loadFromStringArray(data: string[]): void {
    }

}