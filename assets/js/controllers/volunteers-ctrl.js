angular.module('kidmaxServe.controllers.Volunteers', [])
.controller('VolunteersCtlr', ['$scope', 'Entities', 'EntityManager', function ($scope, Entities, EntityManager) {
  var _doc = EntityManager.documents();
  var _addVolunteerForm = document.getElementById('newVolunteerForm');

  var _initialize = function () {
    $scope.form = {
      newVolunteer: Entities.volunteer()
    };
    
    _addVolunteerForm.reset();
    
    EntityManager.volunteers().then(function (data) {
      $scope.Volunteers = data;
    });
  };
  _initialize();
  
  $scope.addVolunteer = function () { 
    if (_addVolunteerForm.validate()) {
      var vol = new _doc(Entities.volunteer());
      vol.name = $scope.form.newVolunteer.name;
      vol.phone = $scope.form.newVolunteer.phone;
      vol.mail = $scope.form.newVolunteer.mail;
      vol.securityCleared = $scope.form.newVolunteer.securityCleared;
      vol.$save(function (vol) {
        _initialize();
      });
    }
  };
}])
;