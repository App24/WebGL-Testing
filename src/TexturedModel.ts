import { RawModel } from "./RawModel";
import { Texture } from "./Texture";

export class TexturedModel {
    public rawModel: RawModel;
    private texture: Texture;

    public constructor(rawModel: RawModel, texture: Texture) {
        this.rawModel = rawModel;
        this.texture = texture;
    }

    public drawModel(){
        this.texture.activate();

        this.rawModel.drawElements();
    }
}