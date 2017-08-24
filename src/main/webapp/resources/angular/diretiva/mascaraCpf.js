angular.module("cliente", []).directive("cpfDir", CpfDir());


function CpfDir() {
    console.log("asdsa");

    return {
        restrict: 'E',
        link: function ($scope, $element, $attrs) {
            $element.on('click', function () {
                console.log("asdd");
            });
        }
    };
}

//        link: function (scope, element, attrs) {
//            $(element).mask('999.999.999-99');
//            element.bind('focus', function () {
//                scope.$eval(attrs.sonClick);
//            });
//        }


//    return {
//        link: function (scope, element, attrs) {
//            var options = {
//                onKeyPress: function (val, e, field, options) {
//                    putMask();
//                }
//            };
//
//            $(element).mask('999.999.999-99', options);
//
//            function putMask() {
//                var mask;
//                var cleanVal = element[0].value.replace(/\D/g, '');//pega o valor sem mascara
//                if (cleanVal.length > 11) {//verifica a quantidade de digitos.
//                    mask = "999.999.999-99";
//                } else {
//                    mask = "999.999.999-99";
//                }
//                $(element).mask(mask, options);//aplica a mascara novamente
//            }
//        }
//    };
//}