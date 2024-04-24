precision highp float;

varying highp vec2 texCoord;
varying highp vec3 normal;

uniform sampler2D texSampler;

void main(){

    vec3 ambientColor = vec3(0.1);

    vec3 norm = normalize(normal);
    vec3 lightDir = normalize(vec3(-.2, 1,.2));

    float diff = max(dot(norm, lightDir), 0.0);

    vec3 diffuse = vec3(1) * diff;

    vec3 finalColor = ambientColor + diffuse;

    highp vec4 sampled = texture2D(texSampler, texCoord);

    gl_FragColor = vec4(sampled.rgb * finalColor, 1);
}