/**
 * Created by sanathkodikara on 2/03/2017.
 */

angular.module('ngSeedApp').directive('ngChord', function () {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/ngChord.html',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      chord: '='
    },
    link: function link(scope, element, attrs) {
      scope.chord = attrs.chordStr;
      scope.originalChord = attrs.chordStr;
    },
    controller: function ($scope) {
      var chordOrder = ['Ab','A','A#','Bb','B','C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#'];
      const vm = this;
      var baseChord = 'E';
      //console.log('chord directive loaded --- ',$scope.chord);
      $scope.$on("$destroy",
        function handleDestroyEvent() {
          console.log("DESTROYED.....");
        }
      );

      $scope.$on("selectedChord", function(event,value) {
        determineChord(baseChord, $scope.originalChord, value);
      });

      function determineChord(baseChord, currentChord, selectedChord) {
        //get actual major chord of the current chord
        var currentMajorChord;
        if (currentChord.length === 1) {
          currentMajorChord = currentChord.charAt(0);
        } else if (currentChord.length === 2 && currentChord.charAt(1) == 'm') {
          currentMajorChord = currentChord.charAt(0);
        } else if (currentChord.length > 2) {
          currentMajorChord = currentChord.substring(0,2);
        } else {
          console.log('PART 1 ',currentMajorChord, ' not supported');
        }

        var currentChordPosition = chordOrder.indexOf(currentMajorChord);
        var baseChordPosition = chordOrder.indexOf(baseChord);
        var selectedChordPosition = chordOrder.indexOf(selectedChord);
        var chordDifference = baseChordPosition - currentChordPosition;
        var newChordPosition = selectedChordPosition - chordDifference;

        //console.log('currentMajorChord',currentMajorChord,' currentChordPosition ',currentChordPosition, 'baseChordPosition ',baseChordPosition);
        console.log('selectedChordPosition',selectedChordPosition,' chordDifference ',chordDifference, 'newChordPosition ',newChordPosition);

        var newPos;
        if(newChordPosition >= 17) {
          newPos = newChordPosition - 17;
        } else if (newChordPosition < 0) {
          newPos = 17 + newChordPosition;
        } else {
          newPos = newChordPosition;
        }
        console.log(newPos);
        if (currentChord.length === 1) {
          console.log(' baseChord ',baseChord, ' currentChord ',currentChord, ' selectedChord ',selectedChord, 'NEW CHORD is ',chordOrder[newPos]);
          $scope.chord = chordOrder[newPos];
        } else if (currentChord.length === 2 && currentChord.charAt(1) == 'm') {
          console.log(' baseChord ',baseChord, ' currentChord ',currentChord, ' selectedChord ',selectedChord, 'NEW CHORD is ',chordOrder[newPos]+'m');
          $scope.chord = chordOrder[newPos]+'m';
        } else if (currentChord.length > 2) {
          var otherTypes = currentChord.substring(2, currentChord.length);
          console.log(' baseChord ',baseChord, ' currentChord ',currentChord, ' selectedChord ',selectedChord, 'NEW CHORD is ',chordOrder[newPos]+ otherTypes);
          $scope.chord = chordOrder[newPos]+ otherTypes;
        } else {
          console.log('FORMAT error');
        }
      }
    }
  }
});