/**
 * Created by sanathkodikara on 22/02/2017.
 */

angular.module('ngSeedApp').directive('scrollDown', function()  {
  var linker = function(scope, element, attrs) {

    element.bind('click', function(){
      console.log('moving');
      console.log( $( this).text() );
      $(this).animate({top: '+=150'});
    });
  };
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/scrollDown.html',
    controllerAs: 'vm',
    scope: {
      test: '='
    },
    controller: function($scope, $document) {
      console.log('directive loaded');
      const vm = this;
      vm.showPlay = true;
      vm.showStop = false;

      vm.play = function() {
        console.log('play');
        vm.showPlay = false;
        vm.showStop = true;
        //resume scrolling from the stopped position
      };

      vm.stop = function() {
        console.log('stop');
        vm.showPlay = true;
        vm.showStop = false;
        //$document.duScrollCancelOnEvents
        //stops scrolling
      };

      vm.scrollSmoothToBottom = function(id) {
        var div = document.getElementById(id);
        //console.log(div, div.scrollHeight , '  ' , div.clientHeight, ' ', $(document).height());
        var elem = $document.find('#'+id);
        console.log(elem);
        //elem.animate({top: '+=150'});
        $('html, body').animate({
          scrollTop: $("#bottom").offset().top
        }, 500);
      };

      vm.scrollSmoothToTop = function(id) {
        var elem = $document.find('#'+id);
        elem.animate({
          scrollTop: 0
        }, 500);
      };

      vm.scrollStop = function(id) {
        var elem = $document.find('#'+id);
        elem.stop();
      };


      vm.toTheTop = function() {
        $document.scrollTopAnimated(0, 5000).then(function() {
          console && console.log('You just scrolled to the top!');
        });
      };

      vm.toTheBottom = function() {
        var section3 = angular.element(document.getElementById('bottom'));
        console.log(section3);
        $document.scrollToElementAnimated(section3, 0, 5000);
      };

    }
  }
});


