(function () {
  var controller = function() {

  };

  var module = angular.module("PsMovies");
  module.component("appAbout", {
    templateUrl: "/ps-movies/app-about.component.html",
    controllerAs: "model",
    controller: [controller],
  });
})();
