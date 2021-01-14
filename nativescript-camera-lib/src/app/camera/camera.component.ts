import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

import { takePicture, requestPermissions, isAvailable, CameraOptions } from '@nativescript/camera';
import { FileSystemEntity, Folder, knownFolders, path } from '@nativescript/core/file-system';
import { ImageAsset } from '@nativescript/core/image-asset';
import { ImageSource } from "@nativescript/core/image-source";

import { Camera, Image64 } from "./camera";

@Component({
    selector: 'fbit-camera',
    templateUrl: 'camera.component.html',
    styleUrls: ['camera.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
    
})

export class CameraComponent implements OnInit {
    public camera: Camera = new Camera();
    public source = new ImageSource();

    @Input() public pictureName: string = 'name';
    @Input() public pictureFolder: string;
    @Input() public pictureOptions: CameraOptions;
    @Input() public buttonColor: string = "#000000"
    @Input() public buttonSize: string = "32"
    @Input() public buttonMargin: string = "10"
    

    

    constructor() {}


    ngOnInit() {
        this.requestCameraPermissions();

        this.camera.cameraOption = {
            width: 300, height: 300, keepAspectRatio: true, 
            saveToGallery: false, allowsEditing: false,
            cameraFacing: 'rear'
        };
        
    }


    /**
     * Take a picture function.
     */
    public cameraTakePicture() {
        takePicture(this.camera.cameraOption).
        then((imageAsset) => {
            console.log("Result is an image asset instance");
            this.camera.image = imageAsset;
            this.camera.imageFolder = this.pictureFolder;
            this.camera.imageName = this.pictureName;

            this.savePicture(imageAsset, this.pictureName, this.pictureFolder);

            console.log(this.camera.image);
            
        }).catch((err) => {
            console.log("Error -> " + err.message);
        });
    }
    

    /**
     * Request camera permission to celphone user.
     */
    private requestCameraPermissions() {
        if (isAvailable()) {
            requestPermissions()
            .then(
                fulfilled => {
                    console.log('requestCameraPermissions fulfilled.');
                },
                rejected => {
                    alert('No camera permissions set.');
                })
        } else {
            alert('No camera detected of available.');
        }
    }


    /**
     * Transform picture in base64 
     * @param picture image to generate to conversion
     * @param extension ex: png, jpeg...
     * @param qualityImage 1 to 100, represent imagem quality
     */
    private generate64format(picture: ImageAsset, extension: any, qualityImage: number) {
        let base64: any;
        ImageSource.fromAsset(picture).then(image => { 
            base64 = image.toBase64String(extension, qualityImage);
        })
        let database: Image64;
        database = {
            "type": "image",
            "image": base64,
            "timestamp": (new Date()).getTime()
        };

        return database;
    }


    /**
     * Take a picture function and transform in base64.
     */
    public cameraTakePicture64() {
        takePicture(this.camera.cameraOption).
        then((imageAsset) => {
            console.log("Result is an image asset instance");

            console.log(this.generate64format(imageAsset, 'png', 70));

        }).catch((err) => {
            console.log("Error -> " + err.message);
        });
    }


    /**
     * 
     * @param cameraImage Image captured by camera
     * @param imageName image name
     * @param folderName folder name to save the image
     */
    public savePicture(cameraImage: ImageAsset, imageName: string, folderName: string) {
        this.source.fromAsset(cameraImage)
            .then((imageSource: ImageSource) => {
                const folderPath: string = path.join(knownFolders.documents().path, folderName); 
                const filePath = path.join(folderPath, imageName + '.png');
                console.log("file path -> " + filePath);

                const saved: boolean = imageSource.saveToFile(filePath, "png");
                if (saved) {
                    console.log("Image saved successfully!");
                    
                }
            })
            .catch((e) => {
                console.log("Error: ");
                console.log(e);
            });
        console.log("source -> " + this.source);
    }


    /**
     * Return the list of all images in specific folder.
     * need improvements
     */
    public getAllImage() {
        const folder: Folder = <Folder> knownFolders.documents();
        const folder1 = folder.getFolder(this.pictureFolder);
        folder1.getEntities().then((itens :Array<FileSystemEntity>) => {
            for (let index = 0; index < itens.length; index++) {
                const folderPath: string = path.join(folder.path, this.pictureFolder+ "/" + itens[index].name);
                console.log("folder -> " + folderPath);
                const imageFromLocalFile: ImageSource = <ImageSource> ImageSource.fromFileSync(folderPath);
                console.log("image -> " + imageFromLocalFile.android);             
            }
        });
    }

}