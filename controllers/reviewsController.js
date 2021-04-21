angular.module("app")
  .controller("reviewsController", function($scope, reviewsService) {
    $scope.view = "list";
    $scope.getView = () => {
      switch($scope.view) {
        case "list" : return "views/reviews/list.html";
        case "create" : return "views/reviews/create.html";
        case "read" : return "views/reviews/read.html";
        case "update" : return "views/reviews/update.html";
      }
    };

    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    }); 

    $scope.getList = (pageNo) => {
      reviewsService.list(pageNo)
        .then((response) => { //jQuery에서는 response 대신 data
          $scope.pager = response.data.pager;
          $scope.reviews = response.data.reviews;
          $scope.pageRange = [];
          for(var i = $scope.pager.startPageNo; i <= $scope.pager.endPageNo; i++) {
            $scope.pageRange.push(i);
          }
          $scope.view = "list";
        });
    };

    $scope.read = (reviewNo) => {
      reviewsService.read(reviewNo)
        .then((response) => {
          $scope.review = response.data;
          $scope.view = "read";
        });
    };
  });