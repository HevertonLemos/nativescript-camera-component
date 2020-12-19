import { Component, OnInit } from "@angular/core";
import { CameraOptions } from "@nativescript/camera";


@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    imageName: string = 'teste';
    cameraOptions: CameraOptions = {
        width: 300, height: 300, keepAspectRatio: true,
        saveToGallery: false, allowsEditing: false,
        cameraFacing: 'rear'
    };

    constructor() { }

    ngOnInit(): void {}

    onReturnPress(event: Event) {
        console.log("event -> " + this.imageName)
    }
}
