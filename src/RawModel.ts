import { gl } from ".";
import { BufferObject } from "./BufferObject";
import { ModelData } from "./OBJLoader/ModelData";
import { OBJFileLoader } from "./OBJLoader/OBJFileLoader";

export class RawModel {
    public modelData: ModelData;
    private vertexBuffer:BufferObject;
    private indicesBuffer:BufferObject;
    private textureCoordsBuffer:BufferObject;
    private normalsBuffer:BufferObject;

    public constructor(objFile: string) {
        this.modelData = OBJFileLoader.loadOBJ(objFile);

        this.vertexBuffer = new BufferObject(gl.ARRAY_BUFFER).setData(new Float32Array(this.modelData.vertices), gl.STATIC_DRAW);
        this.indicesBuffer = new BufferObject(gl.ELEMENT_ARRAY_BUFFER).setData(new Int32Array(this.modelData.indices), gl.STATIC_DRAW);
        this.textureCoordsBuffer = new BufferObject(gl.ARRAY_BUFFER).setData(new Float32Array(this.modelData.textureCoords), gl.STATIC_DRAW);
        this.normalsBuffer = new BufferObject(gl.ARRAY_BUFFER).setData(new Float32Array(this.modelData.normals), gl.STATIC_DRAW);
    }

    public enableVertexAttribs(){
        this.vertexBuffer.bind();
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0,0);
        gl.enableVertexAttribArray(0);
        
        this.textureCoordsBuffer.bind();
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0,0);
        gl.enableVertexAttribArray(1);
        
        this.normalsBuffer.bind();
        gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0,0);
        gl.enableVertexAttribArray(2);
    }
    
    public drawElements(){
        this.indicesBuffer.bind();
        gl.drawElements(gl.TRIANGLES, this.modelData.indices.length, gl.UNSIGNED_INT, 0);
    }
    
    public delete(){
        this.vertexBuffer.delete();
        this.indicesBuffer.delete();
        this.textureCoordsBuffer.delete();
        this.normalsBuffer.delete();
    }
}