angular.module('kidmaxServe.services.EntityManager', [])

.factory('Entities', function() {
  var _fn = {
    volunteer: function () {
    return {
        'type': 'volunteer',
        'name': '',
        'phone': '',
        'mail': '',
        'securityCleared': false,
        'roles': [],
        'preferred': {
          'rooms': [],
          'services': [],
        },
        'addDate': new Date(),
        'active': true
      };
    },
    
    role: function () {
      return {
        'type': 'role',
        'name': '',
        'active': true
      };
    },    
    
    room: function () {
      return {
        'type': 'room',
        'name': '',
        'number': '',
        'active': true
      };
    },
    
    assignment: function () {
      return {
        'type': 'assignment',
        'roomId': null,
        'volunteers': [],
        'leader': null 
      }
    },
    
    event: function () {
      return {
        'type': 'service',
        'date': null,
        'assignments': [],
      }
    }
  };

  return _fn;
})

.factory('EntityManager', function ($resource) {
  var _documents = $resource(window.kidmaxServe.db + ':id', { 'id': '@id' });
  
  var _transformData = function (data) {
    return data.rows.map(function (row) {
      return row.value;
    });
  };
  
  var _volunteers = $resource(window.kidmaxServe.db + '_design/volunteers/_view/by_id/');
  
  var _roles = $resource(window.kidmaxServe.db + '_design/roles/_view/by_id/');
  
  var _rooms = $resource(window.kidmaxServe.db + '_design/rooms/_view/by_id/');
  
  var _events = $resource(window.kidmaxServe.db + '_design/events/_view/by_id/');
  
  var _fn = {
    documents: function () { return _documents },
    volunteers: function () { return _volunteers.get().$promise.then(_transformData) },
    roles: function () { return _roles.get().$promise.then(_transformData) },
    rooms: function () { return _rooms.get().$promise.then(_transformData) },
    services: function () { return _events.get().$promise.then(_transformData) }
  };
  
  return _fn;
})
;