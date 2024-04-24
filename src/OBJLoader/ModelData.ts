export class ModelData {
    public vertices: number[];
    public textureCoords: number[];
    public normals: number[];
    public indices: number[];
    public furthestPoint: number;

    public constructor(vertices: number[], textureCoords: number[], normals: number[], indices: number[], furthestPoint: number) {
        this.vertices =vertices;
        this.furthestPoint = furthestPoint;
        this.indices = indices;
        this.textureCoords = textureCoords;
        this.normals = normals;
    }
}