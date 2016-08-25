
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
 var app=angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'DashCtrl',
        // controller: 'RatingController'
      }
    }
  })

  .state('tab.artists', {
      url: '/artists',
      views: {
        'artists': {
          templateUrl: 'templates/artists.html',
          controller: 'ListController'
        }
      }
    })
    .state('tab.artist-detail', {
      url: '/artists/:chatId',
      views: {
        'artists': {
          templateUrl: 'templates/artist-detail.html',
          controller: 'ListController'
        }
      }
    })

  .state('tab.gigs', {
    url: '/gigs',
    views: {
      'gigs': {
        templateUrl: 'templates/gigs.html',
        controller: 'GigsController'
      }
    }
  })

    .state('tab.gig-detail', {
      url: '/gigs/:gigId',
      views: {
        'gigs': {
          templateUrl: 'templates/gig-detail.html',
          controller: 'GigsController'
        }
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});

app.controller('GigsController', ['$scope', '$http','$state', function($scope, $http, $state){
  $http.get('js/gigs.json').success(function(data)
  {
    $scope.gigs =data;
    // obtain state by gigID
    $scope.whichgig=$state.params.gigId; 
    // deactivate reorder and delete directives
    // $scope.data={showDelete: false, showReorder: false};

    $scope.onItemDelete= function(item){
    $scope.gigs.splice($scope.gigs.indexOf(item), 1);
    }
    // refresh items
    $scope.doRefresh=function(){
      $http.get('js/gigs.json').success(function(data)
  {
    $scope.gigs =data;
    $scope.$broadcast('scroll.refreshComplete');
    });
  }
    $scope.toggleStar=function(item){
      item.star=!item.star;
    }
    // item reorder
    $scope.moveItem=function(item, fromIndex, toIndex){
      $scope.gigs.splice(fromIndex, 1);
      $scope.gigs.splice(toIndex, 0, item);
    }
  });
}]);
//list controller
app.controller('ListController', ['$scope', '$http','$state', function($scope, $http, $state){
  $http.get('js/data.json').success(function(data)
  {
    $scope.artists =data;
    $scope.whichartist=$state.params.chatId;
    $scope.data={showDelete: false, showReorder: false};

    $scope.onItemDelete= function(item){
    $scope.artists.splice($scope.artists.indexOf(item), 1);
    }

    $scope.doRefresh=function(){
      $http.get('js/data.json').success(function(data)
  {
    $scope.artists =data;
    $scope.$broadcast('scroll.refreshComplete');
    });
  }
    $scope.toggleStar=function(item){
      item.star=!item.star;
    }
    $scope.moveItem=function(item, fromIndex, toIndex){
      $scope.artists.splice(fromIndex, 1);
      $scope.artists.splice(toIndex, 0, item);
    }
  });
}]);



// app.controller('RatingController', ['$scope', function($scope) {

//   $scope.ratingsObject = {
//     iconOn : 'ion-ios-star',
//     iconOff : 'ion-ios-star-outline',
//     iconOnColor: 'rgb(200, 200, 100)',
//     iconOffColor:  'rgb(200, 100, 100)',
//     rating:  2,
//     minRating:1,
//     callback: function(rating) {
//       $scope.ratingsCallback(rating);
//     }
//   };

//   $scope.ratingsCallback = function(rating) {
//     console.log('Selected rating is : ', rating);
//   };
// }])
