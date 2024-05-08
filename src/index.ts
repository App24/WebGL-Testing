import { ShaderProgram } from "./ShaderProgram";
import { mat4, vec3 } from "gl-matrix";
import { Texture } from "./Texture";
import { RawModel } from "./RawModel";
import { TexturedModel } from "./TexturedModel";
import { Camera } from "./Camera";

export let gl: WebGL2RenderingContext;

class EntityData {
    public position: vec3;
    public rotation: vec3;

    public constructor() {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
    }

    public createMatrix() {
        const matrix = mat4.create();
        mat4.translate(matrix, matrix, this.position);

        mat4.rotateX(matrix, matrix, this.rotation[0] * (Math.PI / 180));
        mat4.rotateY(matrix, matrix, this.rotation[1] * (Math.PI / 180));
        mat4.rotateZ(matrix, matrix, this.rotation[2] * (Math.PI / 180));

        return matrix;
    }
}

(() => {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl = canvas.getContext("webgl2");

    document.body.appendChild(canvas);

    const program = new ShaderProgram("resources/shaders/simple.vs", "resources/shaders/simple.fs");

    const texture = new Texture("resources/images/dragon.png");

    const dragonModel = new TexturedModel(new RawModel("resources/models/dragon.obj"), texture);

    const delta = 60 / 1000;

    let projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, 60 * (Math.PI / 180), canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    program.setMatrix4fv("projectionMatrix", projectionMatrix);

    const startTime = Date.now();

    const positions: EntityData[] = [];

    const entityData = new EntityData();

    entityData.position = [0, 0, -20];

    positions.push(entityData);

    const camera = new Camera();

    setInterval(() => {

        const timeSinceStart = (Date.now() - startTime) / 1000;

        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.2, 0.3, 0.3, 1);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        program.setMatrix4fv("viewMatrix", camera.getViewMatrix());

        positions.forEach(data => {
            program.setMatrix4fv("modelMatrix", data.createMatrix());

            dragonModel.rawModel.enableVertexAttribs();
            program.use();
            dragonModel.drawModel();
        });

    }, 1000 / 60);

    addEventListener("close", () => {
        program.delete();
        texture.delete();
        dragonModel.rawModel.delete();
    });
})();