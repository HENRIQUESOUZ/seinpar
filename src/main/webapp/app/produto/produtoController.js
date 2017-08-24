var app = angular.module("produto", []);
app.directive("maskmoneyDir", function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ($scope, element, attrs, ctrl) {
            $(element).maskMoney({prefix: 'R$ ', allowNegative: true, thousands: '.', decimal: ',', affixesStay: false});
            element.on('keyup', function () {
                valor = element.val().replace('R$ ', "");
                valor = parseFloat(valor.replace(/,/g, '.').replace(/\.(?![^.]*$)/g, ''));
                ctrl.$setViewValue(valor);
            });
        }
    };
});

app.controller("produtoControler", function ($scope, $http) {

    $http.get("/local/rest/produto/listagem")
            .then(function (response) {
                $scope.listagem = response.data;
            });

    $scope.salvar = function () {
        console.log($scope.produto.preco);
        $http.post("/local/rest/produto/salvar", $scope.produto).then(
                function () {
                    delete $scope.produto;
                    $http.get("/local/rest/produto/listagem")
                            .then(function (response) {
                                $scope.listagem = response.data;
                            });
                });
    };

    $scope.alterar = function (produto) {
        $scope.produto = angular.copy(produto);
    };

    $scope.excluir = function (produto) {
        retorno = confirm("Deseja excluir?");
        if (retorno) {
            $http.post("/local/rest/produto/excluir", produto).then(
                    function () {
                        $http.get("/local/rest/produto/listagem")
                                .then(function (response) {
                                    $scope.listagem = response.data;
                                });
                    });
        }
    };

});