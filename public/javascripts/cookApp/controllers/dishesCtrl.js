/**
 * Created by Eliran on 7/25/2016.
 */
angular.module('cookApp').controller('dishesCtrl', function($scope, $rootScope, $state, dishes, $stateParams, auth) {
    $rootScope.title=" ";
    $rootScope.navDisabled=false;
    $scope.dishes = dishes.dishes;
    $scope.dish = {};
    $scope.dishesByUserContainer = dishes.dishesByUserContainer;
    $scope.user;

    $scope.getAllDishesByUserId = function () {
        $scope.dish = null;
        // $scope.user = auth.get($stateParams.userId);
        var promiseValue;
        auth.get($stateParams.userId).then(function(promiseValue){
            $scope.user =promiseValue;
        })
        return dishes.getAllByUserId($stateParams.userId);
    };

    $scope.submit = function () {
        dishes.create($scope.dish).error(function (error) {
            $scope.error = error;
        }).then(function () {
            $state.go('myDishes', {userId : $scope.user});
        });
    };

    $scope.specificDish = function (id) {
        $scope.dish = dishes.get(id);
        $scope.dish.then(function (promiseValue) {
            $scope.dish = promiseValue;
        });
    };

    $scope.genres = ['American', 'Italian', 'French', 'Iraqi', 'Israeli'];
    $scope.courses = ['First Course', 'Main Dish' , 'Desert'];
    $scope.cities = ['Tel Aviv', 'Ramat Gan', 'Givataim', 'Rishon Letzion', 'Holon', 'Bat Yam'];
    $scope.amounts = ['1','2','3','4','5','6'];

    // init only in newDish state
    if($state.current.name == 'newDish'){
        $scope.user = auth.currentUserId();
    };


    // init only in myDishes state
    if($state.current.name == 'myDishes'){
        $scope.getAllDishesByUserId();
    };
})
    .config(function($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();




});