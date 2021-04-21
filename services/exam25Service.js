angular.module("app")
  .factory("exam25Service", function($http) { //싱글톤으로 사용
    //변수 선언
    const BASE_URL = "http://localhost:8080/products";

    //서비스 객체 리턴
    return {
      list: function(pageNo = 1) {  //pageNo 기본값 1
        const promise = $http.get(BASE_URL, {params:{pageNo:pageNo}});  //프로미스로 리턴 - 비동기 처리
        return promise;
      },

      read: function(pid) {
        const promise = $http.get(BASE_URL + "/" + pid);
        return promise;
      },

      create: function(product) {
        const promise = $http.post(BASE_URL, product);
        return promise;
      },

      update: function(product) {
        const promise = $http.put(BASE_URL, product);
        return promise;
      },

      delete: function(pid) {
        const promise = $http.delete(BASE_URL + "/" + pid);
        return promise;
      }
    };
  });