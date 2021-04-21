angular.module("app")
  .factory("reviewsService", function($http) {
      const BASE_URL = "http://localhost:8080/reviews";

      return {
        list: function(pageNo = 1) {
          const promise = $http.get(BASE_URL, {params:{pageNo:pageNo}}); 
          return promise;
        },

        read: function(reviewNo) {
          const promise = $http.get(BASE_URL + "/" + reviewNo);
          return promise;
        }
      }
  });