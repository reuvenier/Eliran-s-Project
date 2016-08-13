/**
 * Created by Eliran on 8/12/2016.
 */
/**
 * Created by Eliran on 7/25/2016.
 */
angular.module('dinerApp').controller('dishesCtrl', function($scope, $rootScope, $state, dishes, $stateParams, auth) {
    $rootScope.title=" ";
    $rootScope.navDisabled=false;
    $scope.dishes = dishes.dishes;
    $scope.dish = {};
    $scope.dishesByUserContainer = dishes.dishesByUserContainer;
    $scope.user;


    // IF myDishes state got userId as parameter- the users dishes. if not, get all the dishes.
    $scope.getAllDishesByUserId = function () {
        $scope.dish = null;
        if($stateParams.userId != ''){
            auth.get($stateParams.userId).then(function(promiseValue){
                $scope.user =promiseValue;
            });
            return dishes.getAllByUserId($stateParams.userId);
        }
        else{
            $scope.user = {username: 'EatIt'};
            return dishes.getAll();
        }
    };

    $scope.getAllDishesByUserId();

    $scope.submit = function () {
        dishes.create($scope.dish).error(function (error) {
            $scope.error = error;
        }).then(function () {
            $state.go('dishes');
        });
    };

    $scope.specificDish = function (id) {
        $scope.dish = dishes.get(id);
        var promiseValue;
        $scope.dish.then(function (promiseValue) {
            $scope.dish = promiseValue;
        })
    }



    $scope.genres = ('American, Italian, French, Iraqi, Israeli')
        .split(',').map(function(genre) {
            return {abbrev: genre};
        });

    $scope.courses = ['First Course', 'Main Dish', 'Desert'];
    $scope.cities = ['Tel Aviv', 'Ramat-Gan', 'Givataim', 'Rishon Letzion', 'Holon', 'Bat-Yam'];
    $scope.amounts = ['1','2','3','4'];
})
    .config(function($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();




    });