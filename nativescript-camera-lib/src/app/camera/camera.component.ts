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

    constructor() {
    }

    ngOnInit() {
        this._requestCameraPermissions();

        this.camera.cameraOption = {
            width: 300, height: 300, keepAspectRatio: true, 
            saveToGallery: false, allowsEditing: false,
            cameraFacing: 'rear'
        };
    }

    public _takePicture() {
        
        takePicture(this.camera.cameraOption).
        then((imageAsset) => {
            console.log("Result is an image asset instance");
            this.camera.image = imageAsset;
            this.camera.imageFolder = this.pictureFolder;
            this.camera.imageName = this.pictureName;

            this.savePicture(this.camera.image, this.pictureName, this.pictureFolder);

            console.log(this.camera.image);
            
        }).catch((err) => {
            console.log("Error -> " + err.message);
        });
    }
    
    private _requestCameraPermissions() {
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

    private _64format(picture: ImageAsset) {
        //let base64 = picture.toBase64String("png", 70);
        let base64: any;
        ImageSource.fromAsset(picture).then(image => { 
            base64 = image.toBase64String('png', 70); console.log(base64); })
        let database: Image64;
        database = {
            "type": "image",
            "image": base64,
            "timestamp": (new Date()).getTime()
        };
        // let database: any;
        // database.createDocument({
        //     "type": "image",
        //     "image": base64,
        //     "timestamp": (new Date()).getTime()
        // });

        return database;
    }

    public _takePicture64() {
        takePicture(this.camera.cameraOption).
        then((imageAsset) => {
            console.log("Result is an image asset instance");
            //this.cameraImage = this._64format(imageAsset);

            console.log(this._64format(imageAsset));

        }).catch((err) => {
            console.log("Error -> " + err.message);
        });
    }


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

    getAllImage() {
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