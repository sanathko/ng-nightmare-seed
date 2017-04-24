/**
 * Created by sanathkodikara on 2/03/2017.
 */
angular.module('ngSeedApp').controller('Test4Ctrl', function ($scope, $rootScope) {


  $scope.octaveHigher = function() {
    console.log('higher');
    $rootScope.$broadcast('octaveHigher');
  };

  $scope.octaveLower = function() {
    console.log('lower');
    $rootScope.$broadcast('octaveLower');
  };

});