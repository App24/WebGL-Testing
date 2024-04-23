import { ShaderProgram } from "./ShaderProgram";
import { BufferObject } from "./BufferObject";
import { Obj } from "./OBJLoader/Obj";
import { mat4 } from "gl-matrix";
import { Texture } from "./Texture";

export let gl: WebGL2RenderingContext;

(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 600;
    gl = canvas.getContext("webgl2");

    document.body.appendChild(canvas);

    const program = new ShaderProgram("resources/shaders/simple.vs", "resources/shaders/simple.fs");

    const fishObj = new Obj();
    fishObj.loadObjFile("resources/fish.obj");

    const vertexData = fishObj.vertices;

    const uvs = fishObj.uvs;
    
    const indices = fishObj.indices;

    const normals = fishObj.normals;

    const texture = new Texture("resources/images/fish_texture.png");

    const vertexBuffer = new BufferObject(gl.ARRAY_BUFFER).setData(new Float32Array(vertexData), gl.STATIC_DRAW);
    const uvsBuffer = new BufferObject(gl.ARRAY_BUFFER).setData(new Float32Array(uvs), gl.STATIC_DRAW);
    const indicesBuffer = new BufferObject(gl.ELEMENT_ARRAY_BUFFER).setData(new Int32Array(indices), gl.STATIC_DRAW);
    const normalsBuffer = new BufferObject(gl.ARRAY_BUFFER).setData(new Float32Array(normals), gl.STATIC_DRAW);

    const delta = 60 / 1000;

    const modelMatrix = mat4.create();
    mat4.translate(modelMatrix, modelMatrix, [0, 0, -4]);

    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, 60 * (Math.PI / 180), canvas.clientWidth / canvas.clientHeight, 0.1, 100);

    program.setMatrix4fv("projectionMatrix", projectionMatrix);
    program.setMatrix4fv("modelMatrix", modelMatrix);

    const startTime = Date.now();

    setInterval(() => {

        mat4.rotate(modelMatrix, modelMatrix, (Math.PI / 32) * delta, [0, 1, 0]);
        program.setMatrix4fv("modelMatrix", modelMatrix);

        program.setFloat("time", (Date.now() - startTime)/1000);

        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        program.use();

        vertexBuffer.bind();
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        uvsBuffer.bind();
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(1);

        normalsBuffer.bind();
        gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(2);

        texture.activate();

        indicesBuffer.bind();

        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_INT, 0);



    }, 1000 / 60);

    addEventListener("close", () => {
        program.delete();
        vertexBuffer.delete();
        indicesBuffer.delete();
        uvsBuffer.delete();
        normalsBuffer.delete();
        texture.delete();
    });
})();