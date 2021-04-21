angular.module("app")
  .factory("productsRefundService", function($http) {
    const BASE_URL = "http://localhost:8080/products_refund";

      return {
        list: function(pageNo = 1) {
          const promise = $http.get(BASE_URL, {params:{pageNo:pageNo}}); 
          return promise;
        },
      }
  });