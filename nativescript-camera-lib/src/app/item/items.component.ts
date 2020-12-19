import { Component, OnInit } from "@angular/core";


@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    imageName: string = 'teste';

    constructor() { }

    ngOnInit(): void {}

    onReturnPress(event: Event) {
        console.log("event -> " + this.imageName)
    }
}
