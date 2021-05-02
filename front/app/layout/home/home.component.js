function homeComponentCtrl() {
  const $ctrl = this;

  $ctrl.$onInit = () => {
    $ctrl.title = 'Home component working!';
  };
}

export default {
  templateUrl: 'app/layout/home/home.component.html',
  controller: homeComponentCtrl,
  bindings: {},
};
