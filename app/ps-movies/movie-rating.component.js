(function () {
  "use strict";

  var controller = function (psMoviesService) {
    /**
     * Inside the controller, we typically avoid using the "this"
     * reference since "this" in javascript is a little bit slippery
     * so we need to alias that.
     */
    var model = this;
    model.$onInit = function () {
      /**
       * We will now create a new array with elements equal to the model.value
       * since the ng-repeat does only iterate through a collection
       */
      model.entries = new Array(model.value);
    };
    /**
     * This is a function Angular will call whenever one of the bindings will change.
     */
    model.$onChanges = function () {
        /**
         * We will rebuild our array once there are changes on the "value".
         */
        model.entries = new Array(model.value);
    };
  };

  /**
   * movieList is camelCased as the same as other angular directives.
   * But, in the html file, we invoked it using movie-list
   */
  var module = angular.module("PsMovies");
  module.component("movieRating", {
    templateUrl: "/ps-movies/movie-rating.component.html",
    controllerAs: "model",
    controller: ["psMoviesService", controller],
    /**
     * This is a way of telling Angular to bind some properties of my
     * controller instance to the outside world.
     * So, we are telling Angular, that we are defining the property
     * "value" and the "<" sign tells Angular that this is an input. And
     * the word "value" is chosen only arbitrarily. We can use like "foo"
     * or "rating"
     */
    bindings: {
      value: "<",
    },
    /**
     * We are telling Angular that we can replace the default inner template 
     * with the outer template      
     */
    transclude: true
  });
})();
