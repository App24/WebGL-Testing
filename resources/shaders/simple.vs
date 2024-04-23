attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;

uniform highp float time;

varying highp vec2 texCoord;
varying highp vec3 normal;

void main(){
    vec3 vertex = aPosition;

    if(vertex.z > -0.07){
        vertex.x += sin((0.05 + time * 7.3) * 1.44) * 0.33 * -0.07;
    }else{
    vertex.x += sin((vertex.z + time * 7.3)*1.44) * 0.33 * vertex.z;
    }

    gl_Position = projectionMatrix * modelMatrix * vec4(vertex, 1);

    texCoord = aTexCoord;
    normal = mat3(modelMatrix) * aNormal;
}