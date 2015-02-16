angular.module('spapp',['ui.bootstrap']).controller('mainctrl',function($scope,$window){

$scope.tabsmaster=[
    { title:"Page 1",content:"page1.html",active:true,disabled:false},
    { title:"Page 2",content:"page2.html",active:false,disabled:true},
    { title:"Page 3",content:"page3.html",active:false,disabled:true}
    ];
$scope.usermaster = {location:"Location"};
$scope.buttonvalidatemaster={
  location:false,
  depdate:false,
  retdate:false,
}
$scope.locations = ["Boston","New York","Chicago","San Francisco"];
$scope.status = { isopen:true };
$scope.tabs = angular.copy($scope.tabsmaster);
$scope.user = angular.copy($scope.usermaster);
$scope.buttonvalidate = angular.copy($scope.buttonvalidatemaster);
$scope.invalidate = true;
    
  //Datepicker 
$scope.format = 'dd-MMMM-yyyy';
$scope.toggleMin = function() {
  $scope.minDate = $scope.minDate ? null : new Date();
};
$scope.toggleMin();
$scope.datepickers = {
    dt1: false,
    dt2: false
  }
$scope.open = function($event,opened) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.datepickers[opened] =true;
};

//Page 2 Updation 
$scope.$watch(function(){return $scope.user.depdate},
          function(newvalue,oldvalue){ if(newvalue!=null)$scope.updatedepdate(newvalue)});

$scope.$watch(function(){return $scope.user.retdate},
          function(newvalue,oldvalue){ if(newvalue!=null)$scope.updateretdate(newvalue)});   

$scope.updateLocation = function(index){
    $scope.user.location = $scope.locations[index];
    $scope.buttonvalidate.location = true;
    $scope.invalidate = !($scope.buttonvalidate.location && $scope.buttonvalidate.depdate && $scope.buttonvalidate.retdate);
}
$scope.updatedepdate = function(dt){
    $scope.user.depdate = dt;
    $scope.buttonvalidate.depdate =true;
    $scope.invalidate = !($scope.buttonvalidate.location && $scope.buttonvalidate.depdate && $scope.buttonvalidate.retdate);
}
$scope.updateretdate = function(dt){
    $scope.user.retdate = dt;
    $scope.buttonvalidate.retdate = true;
    $scope.invalidate = !($scope.buttonvalidate.location && $scope.buttonvalidate.depdate && $scope.buttonvalidate.retdate);
}
//Tabs functions    
$scope.nexttab1 = function(user){
    angular.extend($scope.user,user);
    $scope.tabs[1].disabled = false;
    $scope.tabs[1].active = true;
    $scope.tabs[0].active = false;
    $scope.tabs[0].disabled = true;
};
$scope.nexttab2 = function(user){
    angular.extend($scope.user,user);
        if($scope.user.retdate >= $scope.user.depdate){
        $scope.tabs[2].disabled = false;
        $scope.tabs[2].active = true;
        $scope.tabs[1].active = false;
        $scope.tabs[1].disabled = true;
        }
    else
        $window.alert("Enter valid dates");

};
$scope.prevtab2 = function(){
    $scope.tabs[1].disabled = true;
    $scope.tabs[1].active = false;
    $scope.tabs[0].active = true;

};
$scope.prevtab3 = function(){
    $scope.tabs[2].disabled = true;
    $scope.tabs[2].active = false;
    $scope.tabs[1].active = true;

};
//Reset
$scope.reset = function(){
  $scope.user = angular.copy($scope.usermaster);
  $scope.tabs = angular.copy($scope.tabsmaster);
  $scope.buttonvalidate = angular.copy($scope.buttonvalidatemaster);
  $scope.invalidate = true;
};

});