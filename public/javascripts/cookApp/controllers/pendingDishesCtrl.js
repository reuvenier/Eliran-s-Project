/**
 * Created by Eliran on 7/26/2016.
 */
angular.module('cookApp').controller('pendingDishesCtrl', function($scope, $rootScope) {
    $rootScope.title= "Dishes waiting for you...";
    $rootScope.navDisabled=false;
});