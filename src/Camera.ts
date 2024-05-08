import { mat4, vec3 } from "gl-matrix";
import { toRadians } from "./Utilities";

export class Camera{
    public position:vec3;
    public yaw:number;
    public pitch:number;

    public constructor(){
        this.position=[0,0,0];
        this.yaw = -90;
        this.pitch = 0;
    }

    public getViewMatrix(){
        let matrix = mat4.create();
        let direction = vec3.create();
        direction[0] = Math.cos(toRadians(this.yaw)) * Math.cos(toRadians(this.pitch));
        direction[1] = Math.sin(toRadians(this.pitch));
        direction[2] = Math.sin(toRadians(this.yaw)) * Math.cos(toRadians(this.pitch));
        let temp = vec3.create();
        direction = vec3.normalize(direction, direction);
        temp = vec3.add(temp, this.position, direction);
        matrix = mat4.lookAt(matrix, this.position, temp, [0,1,0]);
        return matrix;
    }
}