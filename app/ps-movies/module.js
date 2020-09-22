(function () {
  "use strict";

  var module = angular.module("PsMovies", ["PsMovies", "ui.router"]);
  module.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("movieList", {
        url: "/list",
        component: "movieList",
        title: "Movie List"
        // title: function(params) return 'Movie List ${params.code}';
      })
      .state("appAbout", {
        url: "/about",
        component: "appAbout",
        title: "About"
      })
      .state("movieDetail", {
        url: "/detail/:id",
        component: "movieDetail",
        title: function(params){
            return "Movie ID ${params.id}"
        }
      });

    $urlRouterProvider.otherwise("/list");
  });

  /**
   * Change the title of the page depending on the "title"
   * property of the state
   * https://stackoverflow.com/a/43553641/7610023
   */
  module.run(function ($transitions, $window) {
    $transitions.onSuccess({}, (transition) => {
      let title = transition.to().title;
      if (title) {
        if (title instanceof Function) {
          title = title.call(transition.to(), transition.params());
        }
        $window.document.title = title;
      }
    });
  });
})();
