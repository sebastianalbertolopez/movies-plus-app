function homeComponentCtrl() {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    $ctrl.title = 'Home component working!';
  };
}

export default {
  template: '<h1>HELLO!</h1>',
  controller: homeComponentCtrl,
  bindings: {},
};
