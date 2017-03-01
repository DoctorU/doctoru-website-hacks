var myApp = angular.module('redundancyApp', []);
myApp.controller('RedundancyController', ['$scope',function($scope) {
  var self = this;
  /* weeks notice entitlement - 1 week per year of service */
  self.statNoticeEntitlement = function(yos) {
    if(yos < 2)  return 1;
    if(yos >12) return 12;
    return yos;
  };
  /* redundancy payment entitlement: complicated! */
  self.statRedundancyEntitlement = function(age, yos) {
    var ageRemaining = age;
    var entitlement = 0;
    if(yos >= 2) { //only entitled to redundancy if working for 2 years or more.
      do {
        if(ageRemaining > 41 ) {
          entitlement += 1.5;
        } else
        if (ageRemaining > 22 ) {
          entitlement += 1.0;
        } else {
          entitlement += 0.5;
        }
        ageRemaining--;
      }
      while(--yos > 0);
    }
    return entitlement;
  };
  self.calculate = function(data) {
    self.saveData(data);
    console.log("calculate", data);
    self.calculateStatutory(data, $scope.statutory);
    self.calculateOptimal(data, $scope.calculation);
  };
  self.calculateStatutory = function (data, c) {
    var weeklyFromSalary = data.salary / 52.0;
    c.weekly = self.min(weeklyFromSalary, 479.0);
    c.weeklyCapped = (c.weekly >= 479.0);
    c.noticeWeeks = self.statNoticeEntitlement(data.yos);
    c.noticePayment = c.noticeWeeks * c.weekly;
    c.redundancyWeeks = self.statRedundancyEntitlement(data.age, data.yos);
    c.redundancyPayment= self.min(c.redundancyWeeks * c.weekly, 14370.0);
    c.redundancyCapped = (c.redundancyPayment >= 14370.0);
    console.log("calculateStatutory", c);
  };
  self.calculateOptimal = function (data, c) {
    var weeklyFromSalary = data.salary / 52.0;
    c.weekly = weeklyFromSalary;
    c.noticeWeeks = self.max(self.statNoticeEntitlement(data.yos), data.notice);
    c.noticePayment= c.noticeWeeks * c.weekly;
    c.redundancyWeeks = self.statRedundancyEntitlement(data.age, data.yos);
    c.redundancyPayment= c.redundancyWeeks * c.weekly;
    console.log("calculateOptimal", c);
  };
  self.max = function(val1, val2) {
    return val1 > val2? val1 : val2;
  };
  self.min = function(val1, val2) {
    return val1 < val2? val1 : val2;
  };
  self.saveData = function (data) {
    $scope.data = data;
  };
  $scope.selectOption = function() {
    console.log($scope.predefinedOption);
    $scope.data=angular.copy($scope.options[$scope.predefinedOption]);
    self.calculate($scope.data);
  };
  $scope.calculation={};
  $scope.statutory = {};
  $scope.options=[
    {age:20,yos:1,salary:26000,notice:4, id:0},
    {age:30,yos:3,salary:36000,notice:4, id:1},
    {age:40,yos:4,salary:46000,notice:4,id:2}
  ];
  $scope.data=$scope.options[2];
  self.calculate($scope.data);
}]);
