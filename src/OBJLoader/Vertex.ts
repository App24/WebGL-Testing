import { vec3 } from "gl-matrix";

export class Vertex {
    public static NO_INDEX = -1;

    public position: vec3;
    public textureIndex = Vertex.NO_INDEX;
    public normalIndex = Vertex.NO_INDEX;
    public duplicateVertex:Vertex;
    public index:number;
    public length:number;

    public constructor(index:number, position:vec3){
        this.index = index;
        this.position =position;
        this.length = vec3.length(position);
    }

    public isSet() {
        return this.textureIndex != Vertex.NO_INDEX && this.normalIndex != Vertex.NO_INDEX;
    }

    public hasSameTextureAndNormal(textureIndexOther:number, normalIndexOther:number){
        return textureIndexOther == this.textureIndex && normalIndexOther == this.normalIndex;
    }
}