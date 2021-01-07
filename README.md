# camera-component-nativescript

## Dependence
* [nativescript-camera](https://market.nativescript.org/plugins/nativescript-camera/)
  * ```npm i --save @nativescript/camera```

## Parameters Inputs
|Parameter | Type | Description | Notes
------------ | ------------- | ------------- | -------------
pictureName | string | Define the picture to internal system | Default= 'name' 
pictureFolder | string | Define the folder name to save in internal system | Default= '' 
pictureOptions | CameraOptions | Define the optional parameter for setting different camera options| nativescript-camera interface. 
buttonColor | string | Define the icon color | Default= '#000000' (black)
buttonSize | string | Define the icon size | Default= '32' (value in px)
buttonMargin | string | Define the button margin | Default= '10' (value in px)

### CameraOpitions ( by [nativescript-camera](https://market.nativescript.org/plugins/nativescript-camera/) )
|Parameter | Type | Description | Notes
------------ | ------------- | ------------- | -------------
pictureWidth | number | Defines the desired width (in device independent pixels) of the taken image. It should be used with height property. If keepAspectRatio actual image width could be different in order to keep the aspect ratio of the original camera image. The actual image width will be greater than requested if the display density of the device is higher (than 1) (full HD+ resolutions). | Default= 300 
pictureHeight | number | Defines the desired height (in device independent pixels) of the taken image. It should be used with width property. If keepAspectRatio actual image width could be different in order to keep the aspect ratio of the original camera image. The actual image height will be greater than requested if the display density of the device is higher (than 1) (full HD+ resolutions). | Default= 300 
pictureKeepAspectRatio | boolean | Defines if camera picture aspect ratio should be kept during picture resizing. This property could affect width or height return values. | Default= true 
pictureSaveToGallery | boolean | Defines if camera picture should be copied to photo Gallery (Android) or Photos (iOS) | Default= false 
pictureAllowsEditing | boolean | Defines if camera "Retake" or "Use Photo" screen forces the user to crop camera picture to a square and optionally lets them zoom in. | Default= false. Only IOS plataform 
pictureCameraFacing | 'rear' or 'front' | The initial camera facing. Use 'front' for selfies. | Default= 'rear' 

## Use componente
```<fbit-camera [pictureName]="'name'" [pictureFolder]="'pastaX'" [pictureOptions]="width: 300, height: 300, keepAspectRatio: true, saveToGallery: false, allowsEditing: false, cameraFacing: 'rear'}" [buttonColor]="'#3bdb13'" [buttonSize]="'32'" [buttonMargin]="'50'"></fbit-camera>```