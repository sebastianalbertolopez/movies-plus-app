function uploadImageComponentCtrl(Upload, commonService) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    $ctrl.displayOverlay = false;
  };

  $ctrl.uploadImage = (image, $invalidFiles) => {
    if (image) {
      if (image.name.length > 100) {
        return commonService.error('El nombre del archivo no debe superar los 100 caracteres');
      }
      Upload.base64DataUrl(image).then((base64) => {
        const content = base64.split(',')[1];
        const imageObject = {
          base64Content: content,
          name: image.name,
          type: image.type,
          size: image.size
        };

        $ctrl.imageInfo = image;
        $ctrl.image = imageObject;
      });
    }
    else if ($invalidFiles) {
      let errorMessage = null;

      if ($invalidFiles[0].$error === 'maxSize') {
        errorMessage = `El tamaño de la foto seleccionada (${Math.round($invalidFiles[0].size / 1000000)}MB) supera el límite de ${process.env.MAX_FILE_SIZE}MB permitidos.`;
      }
      else if ($invalidFiles[0].$error === 'pattern') {
        errorMessage = 'El archivo que intenta subir no es de tipo imagen.';
      }
      else {
        errorMessage = 'No se pudo subir el archivo, intente nuevamente';
      }

      commonService.error(errorMessage);
    }
  };

  $ctrl.removeImage = () => {
    $ctrl.image = null;
    $ctrl.imageInfo = null;
  };
}

export default {
  templateUrl: 'app/layout/upload-image/upload-image.component.html',
  controller: ['Upload', 'commonService', uploadImageComponentCtrl],
  bindings: { image: '=' }
};
