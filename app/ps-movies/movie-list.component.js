(function () {
  "use strict";

  var controller = function (psMoviesService) {
    /**
     * Inside the controller, we typically avoid using the "this"
     * reference since "this" in javascript is a little bit slippery
     * so we need to alias that.
     */
    var model = this;
    model.movies = [];

    model.$onInit = function () {
      psMoviesService.getMovies().then(
        (data) => {
          model.movies = data;
        },
        () => {
          model.error = "Error retrieving movie list.";
        }
      );
    };    
    model.upRating = function (movie) {
        if (movie.rating < 5) {
            movie.rating += 1;
        }
    };
    model.downRating = function (movie) {
        if (movie.rating > 1) {
            movie.rating -= 1;
        }
    }
  };

  /**
   * movieList is camelCased as the same as other angular directives.
   * But, in the html file, we invoked it using movie-list
   */
  var module = angular.module("PsMovies");
  module.component("movieList", {
    templateUrl: "/ps-movies/movie-list.component.html",
    controllerAs: "model",
    controller: ["psMoviesService", controller],
  });
})();
