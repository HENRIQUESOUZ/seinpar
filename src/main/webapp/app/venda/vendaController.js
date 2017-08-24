var app = angular.module("venda", ['ui.bootstrap', 'ngAnimate']);


app.controller("vendaControler", function ($scope, $http) {

    $scope.valorRecebido = 0.0;
    $scope.valorTroco = 0.0;
    $scope.venda = {};
    $scope.venda.vendaItens = [];
    $scope.venda.total = 0.0;
    $scope.venda.desconto = 0.0;
    $scope.venda.data = new Date();

    $http.get("/local/rest/venda/listagem")
            .then(function (response) {
                $scope.listagem = response.data;
            });

    $scope.salvar = function () {
        $http.post("/local/rest/venda/salvar", $scope.venda).then(
                function () {
                    delete $scope.venda;
                    $http.get("/local/rest/venda/listagem")
                            .then(function (response) {
                                $scope.listagem = response.data;
                            });
                });
    };


    $scope.adicionarItem = function (item) {
        contemItem = false;
        item.quantidade = parseFloat(item.quantidade);
        for (x = 0; x < $scope.venda.vendaItens.length; x++) {
            if ($scope.venda.vendaItens[x].produto.id === item.produto.id) {
                $scope.venda.vendaItens[x].quantidade += item.quantidade;
                contemItem = true;
            }
        }
        if (!contemItem) {
            item.preco = item.produto.preco;
            $scope.venda.vendaItens.push(angular.copy(item));
        }
        $scope.calculaTotal();
        delete($scope.itemVenda);
    };

    $scope.remover = function (index) {
        $scope.venda.vendaItens.splice(index, 1);
        $scope.calculaTotal();
    };

    $scope.calculaTotal = function () {
        $scope.venda.total = 0.0;
        for (x = 0; x < $scope.venda.vendaItens.length; x++) {
            $scope.venda.total +=
                    $scope.venda.vendaItens[x].preco *
                    $scope.venda.vendaItens[x].quantidade;
        }
        if ($scope.venda.desconto > 0) {
            $scope.venda.totalLiquido = $scope.venda.total - $scope.venda.desconto;
        } else {
            $scope.venda.totalLiquido = $scope.venda.total;
        }
        if ($scope.valorRecebido > $scope.venda.totalLiquido) {
            $scope.valorTroco = $scope.valorRecebido - $scope.venda.totalLiquido;
        } else {
            $scope.valorTroco = 0.0;
        }
    };

    $scope.getCliente = function (val) {
        return $http.get("/local/rest/venda/getCliente/" + val)
                .then(function (response) {
                    return response.data;
                });
    };

    $scope.getProduto = function (val) {
        return $http.get("/local/rest/venda/getProduto/" + val)
                .then(function (response) {
                    return response.data;
                });
    };

});