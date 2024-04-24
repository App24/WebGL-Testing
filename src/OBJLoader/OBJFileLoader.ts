import { vec2, vec3 } from "gl-matrix";
import { loadFile } from "../Utilities";
import { Vertex } from "./Vertex";
import { ModelData } from "./ModelData";

export class OBJFileLoader {
    public static loadOBJ(fileName: string) {
        const fileData = loadFile(fileName);
        const lines = fileData.split("\n");

        const vertices: Vertex[] = [];
        const textures: vec2[] = [];
        const normals: vec3[] = [];
        const indices: number[] = [];

        lines.forEach(line => {
            if (line.startsWith("v ")) {
                const currentLine = line.split(" ");
                const vertex = vec3.set(vec3.create(), Number(currentLine[1]), Number(currentLine[2]), Number(currentLine[3]));
                const newVertex = new Vertex(vertices.length, vertex);
                vertices.push(newVertex);
            } else if (line.startsWith("vt ")) {
                const currentLine = line.split(" ");
                const texture = vec2.set(vec2.create(), Number(currentLine[1]), Number(currentLine[2]));
                textures.push(texture);
            } else if (line.startsWith("vn ")) {
                const currentLine = line.split(" ");
                const normal = vec3.set(vec3.create(), Number(currentLine[1]), Number(currentLine[2]), Number(currentLine[3]));
                normals.push(normal);
            }
        });

        lines.forEach(line => {
            if (line.startsWith("f ")) {
                const currentLine = line.split(" ");
                const vertex1 = currentLine[1].split("/");
                const vertex2 = currentLine[2].split("/");
                const vertex3 = currentLine[3].split("/");
                this.processVertex(vertex1, vertices, indices);
                this.processVertex(vertex2, vertices, indices);
                this.processVertex(vertex3, vertices, indices);
                if(currentLine.length > 4){
                    const vertex4 = currentLine[4].split("/");
                    this.processVertex(vertex1, vertices, indices);
                    this.processVertex(vertex3, vertices, indices);
                    this.processVertex(vertex4, vertices, indices);
                }
            }
        });

        this.removeUnusedVertices(vertices);
        const verticesArray = Array(vertices.length * 3).fill(0);
        const texturesArray = Array(vertices.length * 2).fill(0);
        const normalsArray = Array(vertices.length * 3).fill(0);
        const furthest = this.convertDataToArrays(vertices, textures, normals, verticesArray, texturesArray, normalsArray);

        return new ModelData(verticesArray, texturesArray, normalsArray, indices, furthest)
    }

    private static processVertex(vertex: string[], vertices: Vertex[], indices: number[]) {
        const index = Number(vertex[0]) - 1;
        const currentVertex = vertices[index];
        const textureIndex = Number(vertex[1]) - 1;
        const normalIndex = Number(vertex[2]) - 1;

        if (!currentVertex.isSet()) {
            currentVertex.textureIndex = textureIndex;
            currentVertex.normalIndex = normalIndex;
            indices.push(index);
        } else {
            this.dealWithAlreadyProcessedVertex(currentVertex, textureIndex, normalIndex, indices,
                vertices);
        }
    }

    private static convertDataToArrays(vertices: Vertex[], textures: vec2[], normals: vec3[], verticesArray: number[], texturesArray: number[], normalsArray: number[]) {
        let furthestPoint = 0;
        for (let i = 0; i < vertices.length; i++) {
            const currentVertex = vertices[i];
            if(currentVertex.length > furthestPoint){
                furthestPoint = currentVertex.length;
            }
            const position = currentVertex.position;
            const textureCoord = textures[currentVertex.textureIndex];
            const normalVector=  normals[currentVertex.normalIndex];
            verticesArray[i * 3] = position[0];
            verticesArray[i * 3 + 1] = position[1];
            verticesArray[i * 3 + 2] = position[2];

            texturesArray[i * 2] = textureCoord[0];
            texturesArray[i * 2 + 1] = 1 - textureCoord[1];

            normalsArray[i * 3] = normalVector[0];
            normalsArray[i * 3 + 1] = normalVector[1];
            normalsArray[i * 3 + 2] = normalVector[2];
        }
        return furthestPoint;
    }

    private static dealWithAlreadyProcessedVertex(previousVertex: Vertex, newTextureIndex: number, newNormalIndex: number, indices: number[], vertices: Vertex[]) {
        if (previousVertex.hasSameTextureAndNormal(newTextureIndex, newNormalIndex)) {
            indices.push(previousVertex.index);
        } else {
            const anotherVertex = previousVertex.duplicateVertex;
            if (anotherVertex) {
                this.dealWithAlreadyProcessedVertex(anotherVertex, newTextureIndex, newNormalIndex, indices, vertices);
            } else {
                const duplicateVertex = new Vertex(vertices.length, previousVertex.position);
                duplicateVertex.textureIndex = newTextureIndex;
                duplicateVertex.normalIndex = newNormalIndex;
                previousVertex.duplicateVertex = duplicateVertex;
                vertices.push(duplicateVertex);
                indices.push(duplicateVertex.index);
            }
        }
    }

    private static removeUnusedVertices(vertices: Vertex[]) {
        vertices.forEach(vertex => {
            if (!vertex.isSet()) {
                vertex.textureIndex = 0;
                vertex.normalIndex = 0;
            }
        })
    }
}