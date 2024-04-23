import { gl } from ".";
import { BufferObject } from "./BufferObject";

export class Model {
    public vertices: number[];
    public indices: number[];
    public normals: number[];
    public uvs: number[];

    public constructor() {

    }

    public ToBuffers() {
        return {
            verticesBuffer: new BufferObject(gl.ARRAY_BUFFER).setData(new Float32Array(this.vertices), gl.STATIC_DRAW),
            indicesBuffer: new BufferObject(gl.ELEMENT_ARRAY_BUFFER).setData(new Int32Array(this.indices), gl.STATIC_DRAW),
            normalsBuffer: new BufferObject(gl.ARRAY_BUFFER).setData(new Float32Array(this.normals), gl.STATIC_DRAW),
            uvsBuffer: new BufferObject(gl.ARRAY_BUFFER).setData(new Float32Array(this.uvs), gl.STATIC_DRAW)
        };
    }
}