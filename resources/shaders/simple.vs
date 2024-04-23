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
    gl_Position = projectionMatrix * modelMatrix * vec4(vertex, 1);

    texCoord = aTexCoord;
    normal = mat3(modelMatrix) * aNormal;
}