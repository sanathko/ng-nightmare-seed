angular.module('ngSeedApp').controller('HomeCtrl', function ($scope, $timeout,$http,TestService) {

    $scope.translate = function(){
        //post translate request
        TestService.post("translate", $scope.txtVal, { timeout: 100000 }).then(function(data){
            $scope.txtVal.output = data.data.payload;
        });
    };

});