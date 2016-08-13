/**
 * Created by Eliran on 7/24/2016.
 */
angular.module('cookApp').controller('cookCtrl', function($scope, $rootScope, dishes) {
    $rootScope.title= "Take Action";


    $scope.queryIngredients = null;
    $scope.getRecipe = function () {
        dishes.postParamAndGetRecipe($scope.queryIngredients);
    };

});