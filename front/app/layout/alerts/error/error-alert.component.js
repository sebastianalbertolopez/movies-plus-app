function errorAlertComponentCtrl() {
  const $ctrl = this;

  $ctrl.$onInit = () => {};
}

export default {
  templateUrl: 'app/layout/alerts/error-alert.component.html',
  controller: errorAlertComponentCtrl,
  bindings: {}
};
