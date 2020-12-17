import { Component, OnInit } from '@angular/core';

import { takePicture, requestPermissions, isAvailable, CameraOptions } from '@nativescript/camera';
import { ImageAsset } from '@nativescript/core/image-asset';
import { ImageSource } from "@nativescript/core/image-source";
//import { Folder, path, File, knownFolders } from "@nativescript/core/file-system";

import { Image64 } from "./camera";

@Component({
    selector: 'ns-camera',
    templateUrl: 'camera.component.html',
    styleUrls: ['camera.component.css']
    
})

export class CameraComponent implements OnInit {
    public saveToGallery: boolean = false;
    //private count = 1;
    //private folder: Folder = Folder.fromPath(path.join(knownFolders.documents().path, "Archived_Images"));
    public cameraImage: ImageAsset;
    public cameraOption: CameraOptions;

    constructor() { 
        this.cameraOption = {
            width: 300, height: 300, keepAspectRatio: true,
            saveToGallery: this.saveToGallery, allowsEditing: false, cameraFacing: 'rear'
        };
    }

    ngOnInit() {
        this._requestCameraPermissions();
    }

    public _takePicture() {
        takePicture(this.cameraOption).
        then((imageAsset) => {
            console.log("Result is an image asset instance");
            this.cameraImage = imageAsset;

            console.log(this.cameraImage);
            
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
        takePicture(this.cameraOption).
        then((imageAsset) => {
            console.log("Result is an image asset instance");
            //this.cameraImage = this._64format(imageAsset);

            console.log(this._64format(imageAsset));

        }).catch((err) => {
            console.log("Error -> " + err.message);
        });
    }



}