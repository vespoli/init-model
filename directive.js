// This will allow us to initialize a model based on whats in the markup. Angular would have you create a custom 
// service to initialize your model. This "feature" is great for SPA, crap for CMS
.directive('initModel', function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      
      //split out to handle nested objects i.e. payload.foo
      var parts = attrs.initModel.split('.');
      
      var obj;
      //iterate over and add nested objects as needed
      for(var i = 0; i < parts.length-1; i++){      
        obj = scope[parts[i]] = scope[parts[i]] || {};
      }
      
      //init the object to elements value
      obj[parts[parts.length-1]] = element[0].value;
      
      element.attr('ng-model', attrs.initModel);
      element.removeAttr('init-model');
      $compile(element)(scope);
    }
  };
});