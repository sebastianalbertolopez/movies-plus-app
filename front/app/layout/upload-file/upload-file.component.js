function uploadFileComponentCtrl(Upload, commonService) {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    $ctrl.displayOverlay = false;

    if ($ctrl.file && $ctrl.file.uuid) {
      $ctrl.fileInfo = `${process.env.API_URL}/files/${$ctrl.file.uuid}`;
    }
  };

  $ctrl.uploadFile = (file, $invalidFiles) => {
    if (file) {
      if (file.name.length > 100) {
        return commonService.error('El nombre del archivo no debe superar los 100 caracteres');
      }
      Upload.base64DataUrl(file).then((base64) => {
        const content = base64.split(',')[1];
        const fileObject = {
          base64Content: content, // "lashdkjashdjashdkjashdahsh"
          name: file.name, // imagen.png
          type: file.type, // image/png
          size: file.size // 7643746
        };

        // { id, uuid }

        $ctrl.fileInfo = file;
        $ctrl.file = fileObject;
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

  $ctrl.removeFile = () => {
    $ctrl.file = null;
    $ctrl.fileInfo = null;
  };
}

export default {
  templateUrl: 'app/layout/upload-file/upload-file.component.html',
  controller: ['Upload', 'commonService', uploadFileComponentCtrl],
  bindings: { file: '=' }
};
