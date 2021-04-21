angular.module("app")
  .factory("exam27Service", function($http) { //싱글톤으로 사용
    //변수 선언
    const BASE_URL = "http://localhost:8080/auth";

    //서비스 객체 리턴
    return {
      login: function(user) {
        const promise = $http.post(BASE_URL + "/login", user);  //JSON 형태로 본문에 user 들어감
        //const promist = $http.post(BASE_URL + "/login", null, {params: {uid:user.uid, upassword:user.upassowrd}});  - 매개값으로 넘겨줄 경우 : x-www-form 형태
        return promise;
      }
    };
  });