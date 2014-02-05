var app = angular.module('app', []);

app.controller('tabControl', function($scope) {
  $scope.tabs = [];
	
	$scope.data = data;
	
	angular.forEach($scope.data, function(dataPoint){
		//Check if appliance name is already in $scope.tabs
		var nameFound = false;
		angular.forEach($scope.tabs, function(tab){
			if(tab.name === dataPoint.appliance){
				nameFound = true;
			}
		});
		if(nameFound === false){
			//Push new appliance to tabs list
			if(this.length === 0){
				//First appliance will be the default active tab
				this.push({name: dataPoint.appliance, active: true});
			}else{
				//All others are added as inactive
				this.push({name: dataPoint.appliance, active: false});
			}
		}
	}, $scope.tabs);
	
	//currentTab tracks the tab that is currently selected. By default this is the first tab found.
	$scope.currentTab = $scope.tabs[0].name;
	
	$scope.selectTab = function(index){
		//This function handles the event that a tab is clicked
		//Set the currentTab to the tab clicked:
		$scope.currentTab = $scope.tabs[index].name;
		//Set all tags to inactive state
		angular.forEach($scope.tabs, function(tab){
			tab.active = false;
		});
		//Set only the clicked tab to active state
		$scope.tabs[index].active = true;
	}
	
	$scope.timePeriod = function(dataPoint){
		//timePeriod is a filter that compares each point for the graph to the start and end time inputs
		//Remove all formatting from datetime strings
		var formattedStart = $scope.startTime.replace(/[ :-]/g, '');
		var formattedEnd = $scope.endTime.replace(/[ :-]/g, '');
		var formattedTime = dataPoint.datetime.replace(/[ :-]/g, '');
		//Return true if the datapoint passes the filter
		return ((formattedTime >= formattedStart)&&(formattedTime <= formattedEnd));
	}
	
	$scope.editData = function(dataPoint, event){
		//Enables users to edit datetime and value attributs for datapoints
		var target = angular.element(event.target);
		//'floppy' is applied as a class during the editing stage
		if(target.parent().html().indexOf('floppy') === -1){
			//.editing triggers classes to become active and display input fields
			dataPoint.editing = true;
			target.removeClass('glyphicon-pencil').addClass('glyphicon-floppy-saved');
		}else{
			dataPoint.editing = false;
			target.removeClass('glyphicon-floppy-saved').addClass('glyphicon-pencil');
		}
	}
});