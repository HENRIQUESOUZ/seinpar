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
                    if (response.data.tipoFrequencia == "ENTRADA") {
                        alert("Olá " + response.data.aluno.nome + "! Bem vindo a Seinpar")
                    } else {
                        alert("Olá " + response.data.aluno.nome + "! Sua saída foi registrada! Até logo")
                    }
                    delete $scope.aluno;

                    $http.get("/seinpar/rest/frequencia/")
                            .then(function (response) {
                                $scope.listagem = response.data;
                            });
                },
                function (response) {
                    alert("Ops! " + response.data.message);
                }
        );
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