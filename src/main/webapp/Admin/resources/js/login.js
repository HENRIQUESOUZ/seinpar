angular.module('login', [])
        .service('LoginService', function ($http, ApiLocation) {          
            this.logar = function (login, senha) {
                console.log(login +" "+ senha);
                return $http.get(ApiLocation.api + 'usuario/logar/' + login + senha);
            };

        })

        .controller('LoginFormController', function ($scope, entity, LoginService, $state, message) {            
            $scope.logar = function (dd) {
                console.log("Usuario: "+ dd);
                console.log("Usuario: "+ $scope.usuario);
                console.log("Senha: "+ $scope.senha);
                LoginService.logar($scope.login, $scope.senha).then(function (data) {
                    console.log(data.values);
//                    $state.go('welcome');
                    message.success("Salvo com sucesso!");
                }, function (){
                   message.error("Erro ao logar no sistema!"); 
                });
            };

        });

       

       