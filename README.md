# cameralib-nativescript

## Dependence
```npm i --save @nativescript/camera```

## Parameters Inputs
|Parameter | Type | Description | Notes
------------ | ------------- | ------------- | -------------
pictureWidth | number | Defines the desired width (in device independent pixels) of the taken image. It should be used with height property. If keepAspectRatio actual image width could be different in order to keep the aspect ratio of the original camera image. The actual image width will be greater than requested if the display density of the device is higher (than 1) (full HD+ resolutions). | --- 
pictureHeight | number | Defines the desired height (in device independent pixels) of the taken image. It should be used with width property. If keepAspectRatio actual image width could be different in order to keep the aspect ratio of the original camera image. The actual image height will be greater than requested if the display density of the device is higher (than 1) (full HD+ resolutions). | --- 
pictureKeepAspectRatio | boolean | Defines if camera picture aspect ratio should be kept during picture resizing. This property could affect width or height return values. | --- |
pictureSaveToGallery | boolean | Defines if camera picture should be copied to photo Gallery (Android) or Photos (iOS) | --- 
pictureAllowsEditing | boolean | Defines if camera "Retake" or "Use Photo" screen forces the user to crop camera picture to a square and optionally lets them zoom in. | Only IOS plataform |
pictureCameraFacing | 'rear' or 'front' | The initial camera facing. Use 'front' for selfies. | default = 'rear' 
pictureName | string | Define the picture to internal system | --- 
pictureFolder | string | Define the folder name to save in internal system | --- 