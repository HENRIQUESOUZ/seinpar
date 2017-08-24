var app = angular.module("seinpar", []);


app.controller("alunosControler", function ($scope, $http) {

    $http.get("/seinpar/rest/alunos/")
            .then(function (response) {
                $scope.listagem = response.data;
            });

    $scope.salvar = function () {
        console.log("Salvar");
        $http.post("/seinpar/rest/alunos/", $scope.aluno).then(
                function () {
                    delete $scope.aluno;
                    $http.get("/seinpar/rest/alunos/")
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
            $http.post("/seinpar/rest/alunos/excluir", aluno).then(
                    function () {
                        $http.get("/seinpar/rest/alunos")
                                .then(function (response) {
                                    $scope.listagem = response.data;
                                });
                    });
        }
    };

    $scope.getAlunos = function (val) {
        console.log("teste");
        return $http.get('/seinpar/rest/alunos/' + val)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });
    };

});