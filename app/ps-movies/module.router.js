(function () {
  "use strict";

  var module = angular.module("PsMovies", ["PsMovies", "ui.router"]);
  module.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("movieList", {
        url: "/list",
        component: "movieList",
        title: "Movie List",
      })
      .state("appAbout", {
        url: "/about",
        component: "appAbout",
        title: "About",
      })
      .state("movieDetails", {
        url: "/details/:id",
        component: "movieDetails",
        title: function (params) {
          return "Movie ID " + params.id;
        },
        data: {
          needAdmin: true,
        },
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
    // https://ui-router.github.io/guide/ng1/migrate-to-1_0#state-change-events
    $transitions.onStart({}, (transition) => {
      var toState = transition.targetState();
      console.log("ToState", toState._definition.data);
      if (toState._definition.data && toState._definition.data.needAdmin) {
        /**
         * For complete login redirection, you may see
         * https://ui-router.github.io/guide/transitionhooks#redirecting-a-transition
         * And some sample codes 
         * https://stackoverflow.com/a/50580624/7610023
         * 
         */
        console.log("Need admin");
      }
    });
  });
})();
