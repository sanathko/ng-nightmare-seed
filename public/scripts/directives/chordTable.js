/**
 * Created by sanathkodikara on 10/03/2017.
 */
angular.module('ngSeedApp').directive('chordTable', function () {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/chordTable.html',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      baseChord: '='
    },
    link: function link(scope, element, attrs) {
      scope.baseChord = attrs.baseChord;
      console.log('My base chord is --------- ',scope.baseChord);
    },
    controller: function ($scope, $rootScope) {
      const vm = this;
      vm.chordOrder = ['Ab','A','A#','Bb','B','C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#'];
      console.log('My base chord is --------- ********************',$scope.baseChord);
      vm.chordSelected = function(chord) {
        $scope.baseChord = chord;
        console.log('chord selected is ', chord);
        $rootScope.$broadcast('selectedChord',chord);
      }
    }
  }
});