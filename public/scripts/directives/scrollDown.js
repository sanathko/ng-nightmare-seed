/**
 * Created by sanathkodikara on 22/02/2017.
 */

angular.module('ngSeedApp').directive('scrollDown', function () {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'scripts/directives/scrollDown.html',
    controllerAs: 'vm',
    scope: {
      test: '='
    },
    controller: function ($scope, $document) {
      var scrollPlayTimeout = 500;
      $scope.priceSlider = 150;
      console.log('directive loaded');
      const vm = this;
      vm.showPlay = true;
      vm.showStop = false;

      $scope.$watch("priceSlider",
          _.debounce(function handleChange(newValue) {
            if (newValue < 10) {
              newValue = 1
            } else {
              newValue = newValue / 10;
            }
            vm.scrollStop();
            scrollPlayTimeout = 500 * (newValue * 10);
            console.log("priceSlider:", newValue, " scrollPlayTimeout ", scrollPlayTimeout);
            $('html, body').stop();
            $('html, body').clearQueue();
            $('html, body').animate({
              scrollTop: $(document).height()
            }, scrollPlayTimeout, function () {
              console.log('scroll play completed');
              vm.showPlay = true;
              vm.showStop = false;
            });
          }, 1000)
      );

      $scope.$on("$destroy",
          function handleDestroyEvent() {
            console.log("DESTROYED.....");
            $('html, body').clearQueue();
          }
      );

      vm.scrollSmoothPlay = function () {
        vm.showPlay = false;
        vm.showStop = true;
        $('html, body').animate({
          scrollTop: $(document).height()
        }, 5000, function () {
          console.log('scroll play completed');
          vm.showPlay = true;
          vm.showStop = false;
        });
      };

      vm.scrollSmoothToBottom = function () {
        vm.showPlay = false;
        vm.showStop = true;
        $('html, body').animate({
          scrollTop: $(document).height()
        }, 500, function () {
          console.log('scroll to BOTTOM completed');
          vm.showPlay = true;
          vm.showStop = false;
        });
      };

      vm.scrollSmoothToTop = function () {
        vm.showPlay = false;
        vm.showStop = true;
        $('html, body').animate({
          scrollTop: $("#top").offset().top
        }, 500, function () {
          console.log('scroll to TOP completed');
          vm.showPlay = true;
          vm.showStop = false;
        });
      };

      vm.scrollStop = function () {
        $('html, body').stop();
        vm.showPlay = true;
        vm.showStop = false;
      };
    }
  }
});


