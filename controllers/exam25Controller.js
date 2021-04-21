angular.module("app")
  .controller("exam25Controller", function($scope, exam25Service) {
    $scope.view = "list";
    $scope.getView = () => {
      switch($scope.view) {
        case "list" : return "views/exam25_http_products/list.html";
        case "create" : return "views/exam25_http_products/create.html";
        case "read" : return "views/exam25_http_products/read.html";
        case "update" : return "views/exam25_http_products/update.html";
      }
    };

    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    }); 
    
    $scope.getList = (pageNo) => {
      exam25Service.list(pageNo)
        .then((response) => { //jQuery에서는 response 대신 data
          $scope.pager = response.data.pager;
          $scope.products = response.data.products;
          $scope.pageRange = [];
          for(var i = $scope.pager.startPageNo; i <= $scope.pager.endPageNo; i++) {
            $scope.pageRange.push(i);
          }
          $scope.view = "list";
        });
    };
    
    $scope.read = (pid) => {
      exam25Service.read(pid)
        .then((response) => {
          $scope.product = response.data;
          $scope.view = "read";
        });
    };

    $scope.battachUrl = (pid) => {
      return exam25Service.battachUrl(pid);
    }

    $scope.createBoardForm = () => {
      $scope.product = null;  //기존 상태데이터에 저장되어 있는 데이터 없앰
      $scope.view = "create";
    };

    $scope.createProduct = (product) => {
      if(product && product.name && product.description && product.category && product.price) {
        exam25Service.create(product)
        .then((response) => {
            console.log("실행");
            $scope.getList(1);
            $scope.view = "list";
        });
      }
    };
    
    $scope.cancel = () => {
      $scope.getList($scope.pager.pageNo);
      $scope.view = "list";
    };

    $scope.updateProductForm = () => {
      $scope.view = "update";
    };

    $scope.updateProduct = (product) => {
      if( product.name && product.description && product.category && product.price) {        
        exam25Service.update(product)
        .then((response) => {
            $scope.read(product.pid);
            $scope.view = "read";
        });
      }
    };

    $scope.deleteProduct = (pid) => {
      exam25Service.delete(pid)
        .then((response) => {
          $scope.getList(1);
          $scope.view = "list";
        })
    }
  });