attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;

varying highp vec2 texCoord;
varying highp vec3 normal;

void main(){
    gl_Position = projectionMatrix * modelMatrix * vec4(aPosition, 1);

    texCoord = aTexCoord;
    normal = mat3(modelMatrix) * aNormal;
}