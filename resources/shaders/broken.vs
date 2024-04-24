attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;

uniform highp float time;

uniform highp float _SpeedX;
uniform highp float _FrequencyX;
uniform highp float _AmplitudeX;

uniform highp float _SpeedY;
uniform highp float _FrequencyY;
uniform highp float _AmplitudeY;

uniform highp float _SpeedZ;
uniform highp float _FrequencyZ;
uniform highp float _AmplitudeZ;

uniform highp float _HeadLimit;

varying highp vec2 texCoord;
varying highp vec3 normal;

void main(){
    vec3 vertex = aPosition;

    vertex.z += sin((vertex.z + time * _SpeedX) * _FrequencyX) * _AmplitudeX;
    vertex.y += sin((vertex.y + time * _SpeedY) * _FrequencyY) * _AmplitudeY;

    if(vertex.z > _HeadLimit){
        vertex.x += sin((0.05 + time * _SpeedZ) * _FrequencyZ) * _AmplitudeZ * _HeadLimit;
    }else{
        vertex.x += sin((vertex.x + time * _SpeedZ) * _FrequencyZ) * _AmplitudeZ * vertex.z;
    }

    gl_Position = projectionMatrix * modelMatrix * vec4(vertex, 1);

    texCoord = aTexCoord;
    normal = mat3(modelMatrix) * aNormal;
}