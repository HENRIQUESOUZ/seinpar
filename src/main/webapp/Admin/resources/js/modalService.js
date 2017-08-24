(function () {
    'use strict';
    angular.module('modalService', [])
        .service('ModalService', ModalConfirmationService)
        .controller('ModalController', ModalController);

    ModalConfirmationService.$inject = ['$uibModal'];

    function ModalConfirmationService($uibModal) {
        this.confirmation = confirmation;

        function confirmation(contentModal,$scope) {
            if (!contentModal) {
                return;
            }
            var url ='';
            if (contentModal.url == null || contentModal.url == '') {
                url = 'modal-confirmation.html';//url padrão
            } else {
                url = contentModal.url;
            }
           console.log(contentModal.url);
            var modalInstance = $uibModal.open({
                templateUrl: "./resources/modal/"+ url,
                controller: 'ModalController',
                bindToController: true,
                resolve: {
                    dataPreService: dataPreService
                }
            });

            function dataPreService() {
                return contentModal;
            }

            return modalInstance.result;
        }
    }

    ModalController.$inject = ['dataPreService','$scope'];

    function ModalController(dataPreService,$scope) {
        $scope.yes = yes;
        $scope.cancel = cancel;
        $scope.confirm = {
            header: dataPreService.header,
            body: dataPreService.target
        };

        function yes() {
            $scope.$close(dataPreService.object);
        };
        function cancel() {
            $scope.$dismiss('cancel');
        }
    }
}());
