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
     * 
     * <  - One way data binding
     *    Utilize one-way data binding for your bindings. Two way data bindings were great and one of 
     *    the neatest feature of AngularJS, but it comes at a performance cost with the bound properties 
     *    being watched within the component scope. This also means anything you change in component 
     *    scope would be reflected in the parent in a two-way binding. 
     *    !Important! - Its important to note that objects are passed by reference instead of a 
     *    new copy. This means if your bound property is an object or array, changes to these objects 
     *    would indeed reflect changes in the parent scope and still give you a two way data binding 
     *    result. This is why its important to not mutate the object/array in the component scope and 
     *    make those changes in the parent.
     * 
     * =  - Two way data binding
     *    No worries if you need it though. Two way data binding is still around. 
     * 
     * &  - Output event. Provides a hook to parent components
     * 		Bindings marked with '&' signify a parameter that accepts a callback function from the 
     *    parent component. This allows the parent to listen or catch any changes/messages. This is how 
     *    our "dumb" component will talk back to the parent component with the change or event.
     * 
     * @  - String input
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
