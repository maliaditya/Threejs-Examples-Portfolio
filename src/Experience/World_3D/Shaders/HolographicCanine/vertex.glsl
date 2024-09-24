#define MAX_BONES 200 

uniform mat4 finalBonesMatrices[MAX_BONES];  // Bone matrices passed from JavaScript


const int MAX_BONE_INFLUENCE = 4;

void main() {
    vec4 totalPosition = vec4(0.0);

    // Apply bone transformations based on skin indices and weights
    for (int i = 0; i < MAX_BONE_INFLUENCE; i++) {
        if (skinIndex[i] == -1.0) continue;  // Skip invalid bone index
        int boneID = int(skinIndex[i]);
        vec4 boneTransformedPosition = finalBonesMatrices[boneID] * position;
        totalPosition += boneTransformedPosition * skinWeight[i];
    }

    // Project final position to clip space
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * totalPosition;

    // Pass UV coordinates to the fragment shader
}