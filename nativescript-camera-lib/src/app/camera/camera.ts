import { CameraOptions } from "@nativescript/camera";
import { ImageAsset } from "@nativescript/core/image-asset";

export class Camera {
    image: ImageAsset;
    imageName: string
    imageFolder: string;
    cameraOption: CameraOptions;

    constructor() {
        this.image;
        this.imageName;
        this.imageFolder;
        this.cameraOption;
    }
}

export interface Image64 {
    type: string,
    image: string,
    timestamp: number
}