angular.module('kidmaxServe.controllers.Volunteers', [])
.controller('VolunteersCtlr', ['$scope', '$state', 'EntityManager', function ($scope, $state, EntityManager) {
  var _doc = EntityManager.documents();
  var _vwscope = document.querySelector('#viewVolunteersScope');

  var _initialize = function () {
    EntityManager.volunteers().then(function (data) {
      _vwscope.volunteers = data;
    });
  };
  _initialize();
  
  $scope.getVolunteerDetails = function (id) {
    var stateparams = { }
    if (id) {
      stateparams.volunteerId = id; 
    }
    
    $state.go('kms.volunteers.details', stateparams);
  };
}])

.controller('VolunteerDetailsCtlr', ['$scope', '$state', '$stateParams', 'Entities', 'EntityManager', function ($scope, $state, $stateParams, Entities, EntityManager) {
  var _doc = EntityManager.documents();
  var _volunteerForm = document.getElementById('volunteerForm');

  var _dialog = document.querySelector('.view-volunteer-details > paper-dialog');
  
  $scope.form = {};

  var _initialize = function () {
    if ($stateParams.volunteerId == 'new') {
      $scope.form.mode = 'new';
      $scope.volunteer = Entities.volunteer()
      _dialog.open();
    }
    else {
      $scope.form.mode = 'edit';
      _doc.get({ id: $stateParams.volunteerId }, function (volunteer) {
        $scope.volunteer = volunteer;
        _dialog.open();
      });
    }
    
    // if the modal is closed go back to the previous state
    _dialog.addEventListener('iron-overlay-closed', function () {
      $state.go('kms.volunteers');
    })
  };
  _initialize();
  
  $scope.addVolunteer = function () {
    if (_volunteerForm.validate()) {
      var vol = new _doc(Entities.volunteer());
      vol.name = $scope.form.newVolunteer.name;
      vol.phone = $scope.form.newVolunteer.phone;
      vol.mail = $scope.form.newVolunteer.mail;
      vol.securityCleared = $scope.form.newVolunteer.securityCleared;
      vol.$save(function () {
        _dialog.close();
      });
    }
  };
}])
;