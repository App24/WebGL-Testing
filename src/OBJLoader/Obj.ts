import { loadFile } from "../Utilities";
import { Extent } from "./Extent";
import { Face } from "./Face";
import { Normal } from "./Normal";
import { TextureVertex } from "./TextureVertex";
import { Vertex } from "./Vertex";

class FaceData {
    public vertexA: Vertex;
    public vertexB: Vertex;
    public vertexC: Vertex;
    public normalA: Normal;
    public normalB: Normal;
    public normalC: Normal;
    public textureA: TextureVertex;
    public textureB: TextureVertex;
    public textureC: TextureVertex;
}

export class Obj {
    public vertexList: Vertex[];
    public faceList: Face[];
    public textureList: TextureVertex[];
    public normalList: Normal[];

    public vertices: number[];
    public uvs: number[];
    public normals: number[];
    public indices: number[];

    public size: Extent;

    public useMtl: string;
    public mtl: string;

    public constructor() {
        this.vertexList = [];
        this.faceList = [];
        this.textureList = [];
        this.normalList = [];
    }

    public loadObjFile(path: string) {
        const file = loadFile(path);
        this.loadObj(file.split("\n"));
    }

    public loadObj(data: string[]) {
        data.forEach(line => {
            this.processLine(line);
        });

        {

            const indices = this.facesToVertexIndices();
            const newArray: Vertex[] = [];

            indices.forEach(i => {
                newArray.push(this.vertexList[i]);
            });

            this.vertexList = newArray;
        }

        {

            const indices = this.facesToNormalIndices();
            const newArray: Normal[] = [];

            indices.forEach(i => {
                newArray.push(this.normalList[i]);
            });

            this.normalList = newArray;
        }

        {

            const indices = this.facesToTextureIndices();
            const newArray: TextureVertex[] = [];

            indices.forEach(i => {
                newArray.push(this.textureList[i]);
            });

            this.textureList = newArray;
        }

        this.indices = [];
        this.vertices = [];
        this.normals = [];
        this.uvs = [];

        interface Vec2 {
            x: number;
            y: number;
        }

        interface Vec3 {
            x: number;
            y: number;
            z: number;
        }

        const temp: { v: Vec3, u: Vec2, n: Vec3 }[] = []

        for (let i = 0; i < this.vertexList.length; i++) {
            const vertice = { x: this.vertexList[i].x, y: this.vertexList[i].y, z: this.vertexList[i].z };
            const uv = { x: this.textureList[i].x, y: this.textureList[i].y };
            const normal = { x: this.normalList[i].x, y: this.normalList[i].y, z: this.normalList[i].z };

            const data = { v: vertice, u: uv, n: normal };

            const index = temp.findIndex(d => d === data);
            if (index < 0) {
                this.indices.push(temp.length);
                temp.push(data);
                this.vertices.push(vertice.x, vertice.y, vertice.z);
                this.normals.push(normal.x, normal.y, normal.z);
                this.uvs.push(uv.x, uv.y);
            } else {
                this.indices.push(index);
            }
        }

        /*faces.forEach(face=>{
            this.vertexList.push(face.vertexA);
            this.vertexList.push(face.vertexB);
            this.vertexList.push(face.vertexC);
        });*/
    }

    private processLine(line: string) {
        const parts = line.split(' ').filter(c => c !== '');

        if (parts.length > 0) {
            switch (parts[0]) {
                case "usemtl":
                    this.useMtl = parts[1];
                    break;
                case "mtllib":
                    this.mtl = parts[1];
                    break;
                case "v":
                    const v = new Vertex();
                    v.loadFromStringArray(parts);
                    this.vertexList.push(v);
                    v.Index = this.vertexList.length;
                    break;
                case "vn":
                    const n = new Normal();
                    n.loadFromStringArray(parts);
                    this.normalList.push(n);
                    n.Index = this.normalList.length;
                    break;
                case "f":
                    const f = new Face();
                    f.loadFromStringArray(parts);
                    f.UseMtl = this.useMtl;
                    this.faceList.push(f);
                    break;
                case "vt":
                    const vt = new TextureVertex();
                    vt.loadFromStringArray(parts);
                    this.textureList.push(vt);
                    vt.Index = this.textureList.length;
                    break;
            }
        }
    }

    public facesToVertexIndices() {
        const indices: number[] = [];

        for (let i = 0; i < this.faceList.length; i++) {
            const face = this.faceList[i];

            if (face.VertexIndexList.length == 4) {

                indices.push(face.VertexIndexList[0] - 1);
                indices.push(face.VertexIndexList[1] - 1);
                indices.push(face.VertexIndexList[2] - 1);

                indices.push(face.VertexIndexList[0] - 1);
                indices.push(face.VertexIndexList[2] - 1);
                indices.push(face.VertexIndexList[3] - 1);
            } else {
                face.VertexIndexList.forEach(v => {
                    indices.push(v - 1);
                });
            }
        }

        return indices;
    }

    public facesToNormalIndices() {
        const indices: number[] = [];

        for (let i = 0; i < this.faceList.length; i++) {
            const face = this.faceList[i];

            if (face.NormalVertexIndexList.length == 4) {

                indices.push(face.NormalVertexIndexList[0] - 1);
                indices.push(face.NormalVertexIndexList[1] - 1);
                indices.push(face.NormalVertexIndexList[2] - 1);

                indices.push(face.NormalVertexIndexList[0] - 1);
                indices.push(face.NormalVertexIndexList[2] - 1);
                indices.push(face.NormalVertexIndexList[3] - 1);
            } else {
                face.NormalVertexIndexList.forEach(v => {
                    indices.push(v - 1);
                });
            }
        }

        return indices;
    }

    public facesToTextureIndices() {
        const indices: number[] = [];

        for (let i = 0; i < this.faceList.length; i++) {
            const face = this.faceList[i];

            if (face.TextureVertexIndexList.length == 4) {

                indices.push(face.TextureVertexIndexList[0] - 1);
                indices.push(face.TextureVertexIndexList[1] - 1);
                indices.push(face.TextureVertexIndexList[2] - 1);

                indices.push(face.TextureVertexIndexList[0] - 1);
                indices.push(face.TextureVertexIndexList[2] - 1);
                indices.push(face.TextureVertexIndexList[3] - 1);
            } else {
                face.TextureVertexIndexList.forEach(v => {
                    indices.push(v - 1);
                });
            }
        }

        return indices;
    }

    public vertexListToVertices() {
        const vertices: number[] = [];

        this.vertexList.forEach(v => vertices.push(v.x, v.y, v.z));

        return vertices;
    }

    public vertexTexturesListToUvs() {
        const vertices: number[] = [];

        this.textureList.forEach(v => vertices.push(v.x, v.y));

        return vertices;
    }

    public vertexNormalsToNormals() {
        const vertices: number[] = [];

        this.normalList.forEach(v => vertices.push(v.x, v.y, v.z));

        return vertices;
    }
}