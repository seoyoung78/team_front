angular.module("app")
  .controller("exam27Controller", function($rootScope, $scope, exam27Service, $window, $location) {
    $scope.login = (user) => {
      exam27Service.login(user)
        .then ((response) => {
          $rootScope.uid = response.data.uid;
          $rootScope.authToken = response.data.authToken;

          //브라우저 상의 Session Storage에 저장 --> 새로고침 해도 데이터 날라가는 것 방지
          sessionStorage.setItem("uid", response.data.uid);
          sessionStorage.setItem("authToken", response.data.authToken);

          $location.url("/");
        })
        .catch ((response) => {
          $window.alert("로그인 실패: " + response.data.message);
        })
    };
  });