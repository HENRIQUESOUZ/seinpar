var app = angular.module("seinpar", []);


app.controller("frequenciaControler", function ($scope, $http) {

    $http.get("/seinpar/rest/frequencia/")
            .then(function (response) {
                $scope.listagem = response.data;
            });

    $scope.salvar = function () {
        console.log("Salvar");
        $http.post("/seinpar/rest/frequencia/", $scope.aluno).then(
                function (response) {
                    console.log(response)
                    alert("Registrado com sucesso! " + response.data.nome)
                    delete $scope.aluno;

                    $http.get("/seinpar/rest/frequencia/")
                            .then(function (response) {
                                $scope.listagem = response.data;
                            });
                });
    };

    $scope.alterar = function (aluno) {
        $scope.aluno = angular.copy(aluno);
    };

    $scope.excluir = function (aluno) {
        retorno = confirm("Deseja excluir?");
        if (retorno) {
            $http.post("/seinpar/rest/frequencia/excluir", aluno).then(
                    function () {
                        $http.get("/seinpar/rest/frequencia)")
                                .then(function (response) {
                                    $scope.listagem = response.data;
                                });
                    });
        }
    };


});