import { Component, OnInit } from '@angular/core';

import { takePicture, requestPermissions, isAvailable, CameraOptions } from '@nativescript/camera';
import { ImageAsset } from '@nativescript/core/image-asset';
//import { ImageSource, fromFile, fromResource, fromBase64 } from "@nativescript/core/image-source";
//import { Folder, path, File, knownFolders } from "@nativescript/core/file-system";

@Component({
    selector: 'ns-camera',
    templateUrl: 'camera.component.html',
    styleUrls: ['camera.component.css']
    
})

export class CameraComponent implements OnInit {
    public saveToGallery: boolean = true;
    //private count = 1;
    //private folder: Folder = Folder.fromPath(path.join(knownFolders.documents().path, "Archived_Images"));
    public cameraImage: ImageAsset;
    public cameraOption: CameraOptions;

    constructor() { 
        this.cameraOption = {
            width: 300, height: 300, keepAspectRatio: true,
            saveToGallery: true, allowsEditing: false, cameraFacing: 'rear'
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


}