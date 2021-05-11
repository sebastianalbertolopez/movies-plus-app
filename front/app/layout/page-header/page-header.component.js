function pageHeaderComponentCtrl() {
  const $ctrl = this;

  $ctrl.$onInit = () => {};
}

export default {
  templateUrl: 'app/layout/page-header/page-header.component.html',
  controller: [pageHeaderComponentCtrl],
  bindings: {
    title: '<',
    actions: '<?'
  }
};
