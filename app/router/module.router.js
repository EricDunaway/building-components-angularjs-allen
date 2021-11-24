(function () {
  "use strict";

  var module = angular.module("PsMovies", ["PsMovies", "ui.router"]);
  module.config(function ($stateProvider, $urlRouterProvider) {
    /**
     * Set the default child state when the parent detail state is accessed.
     */
    $urlRouterProvider
      .when("/details/:id", "/details/:id/overview")
      .otherwise("/list");
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
        /**
         * Instead of using url: "/details/:id", we are now adding "..." to tell the router
         * this is a non-terminal path. Which means we need to load movieDetails and this
         * component has the ability load a sub-component based on the additional path in the
         * URL
         *
         * This is not necessary to use abstract:true for prepend url.
         * Abstract:true only require when there is no need to show html template itself,
         * but this template helps child state's template to render
         *
         * abstract: true,
         * url: "/details/:id",
         * template: "<ui-view></ui-view>"
         */
        abstract: false,
        url: "/details/:id",
        component: "movieDetails",
        title: function (params) {
          return "Movie ID " + params.id;
        },
        data: {
          needAdmin: true,
        },
        /**
         * We are adding routing configuration for this parent detail component
         * where if we add /overview to the /details/:id/ parent URL, then it will redirect
         * to the movie overview page.
         */
      })
      .state("movieDetails.movieOverview", {
        url: "/overview",
        //component: "movieOverview",
        template: "<p>This is the movie overview.</p>",
        title: "Movie Overview",
      })
      .state("movieDetails.movieCast", {
        url: "/cast",
        //component: "movieCast",
        template: "<p>This is info about the movie cast.</p>",
        title: "Movie Cast",
      })
      .state("movieDetails.movieDirector", {
        url: "/director",
        //component: "movieDirector",
        template: "<p>This is the info about the movie director.</p>",
        title: "Movie Director",
      });    
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
