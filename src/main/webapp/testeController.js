var app = angular.module("teste", []);

app.controller("testeControler", function ($scope, $http) {   

    $http.get("/seimpar/rest/aluno/")
            .then(function (response) {
                $scope.listagem = response.data;
            });

    $scope.salvar = function () {
        $http.post("/local/rest/teste/salvar", $scope.teste).then(
                function () {
                    delete $scope.teste;
                    $http.get("/local/rest/teste/listagem")
                            .then(function (response) {
                                $scope.listagem = response.data;
                            });
                });
    };

    $scope.alterar = function (teste) {
        $scope.teste = angular.copy(teste);
    };
    
    $scope.excluir = function (teste) {
        retorno = confirm("Deseja excluir?");
        if (retorno) {
            $http.post("/local/rest/teste/excluir", teste).then(
                    function () {
                        $http.get("/local/rest/teste/listagem")
                                .then(function (response) {
                                    $scope.listagem = response.data;
                                });
                    });
        }
    };

});