angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

app.controller('Social', ['$scope', function($scope){
    $scope.share = function(t, msg, img, link){  
        if(t == 'w')
            window.plugins.socialsharing
            .shareViaWhatsApp(msg, '', link);
        else if(t == 'f')
            window.plugins.socialsharing
            .shareViaFacebook(msg, img, link);    
        else if(t == 't')
            window.plugins.socialsharing
            .shareViaTwitter(msg, img, link);    
        else if(t == 'sms')
            window.plugins.socialsharing
            .shareViaSMS(msg+' '+img+' '+link);    
        else
        {
            var sub = 'Beautiful images inside ..';
            window.plugins.socialsharing
            .shareViaEmail(msg, sub, '');        
        }    
    }
}])
//ratings controller
app.controller('RatingController', ['$scope', function($scope) {

  $scope.ratingsObject = {
    iconOn : 'ion-ios-star',
    iconOff : 'ion-ios-star-outline',
    iconOnColor: 'rgb(200, 200, 100)',
    iconOffColor:  'rgb(200, 100, 100)',
    rating:  2,
    minRating:1,
    callback: function(rating) {
      $scope.ratingsCallback(rating);
    }
  };

  $scope.ratingsCallback = function(rating) {
    console.log('Selected rating is : ', rating);
  };
}])

//imabe controller
app.controller('ImgController', ['$scope', '$http','$state', function($scope, $http, $state){
  $http.get('js/gigs.json').success(function(data)
  {
    $scope.images =data;
 $scope.loadImages = function() {
        for(var i = 0; i < 20; i++) {
            $scope.images.push({id: i, src: "data"});
        }
    }
  })
 
}]);