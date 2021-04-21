angular.module("app")
  .controller("exam26Controller", function($scope, exam26Service, $rootScope) {
    //처음 실행 시 무조건 첫 페이지
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
    }); 

    //include 시 외부 서버 경로 변경
    $scope.view = "list";
    $scope.getView = () => {
      switch($scope.view) {
        case "list" : return "views/exam26_http_boards/list.html";
        case "create" : return "views/exam26_http_boards/create.html";
        case "read" : return "views/exam26_http_boards/read.html";
        case "update" : return "views/exam26_http_boards/update.html";
      }
    };

    $scope.getList = (pageNo) => {
      exam26Service.list(pageNo)
        .then((response) => { //jQuery에서는 response 대신 data
          $scope.pager = response.data.pager;
          $scope.boards = response.data.boards;
          $scope.pageRange = [];
          for(var i = $scope.pager.startPageNo; i <= $scope.pager.endPageNo; i++) {
            $scope.pageRange.push(i);
          }
          $scope.view = "list";
        });
    };
    
    $scope.read = (bno) => {
      exam26Service.read(bno)
        .then((response) => {
          $scope.board = response.data;
          $scope.view = "read";
        });
    };

    $scope.battachUrl = (bno) => {
      return exam26Service.battachUrl(bno);
    }

    $scope.createBoardForm = () => {
      $scope.board = null;  //기존 상태데이터에 저장되어 있는 데이터 없앰
      $scope.view = "create";
    };

    $scope.createBoard = (board) => {
      if(board && board.btitle && board.bcontent) {
        var formData = new FormData();  //multipart 데이터 객체
        formData.append("btitle", board.btitle);
        formData.append("bcontent", board.bcontent);
        formData.append("bwriter", $rootScope.uid);
        var battach = $("#battach")[0].files[0];  //엘리먼트 객체를 받음
        //var battach = document.querySelector("#battach").files[0];

        console.log(board.bwriter);
        if(battach) {
          formData.append("battach", battach);
        }
        exam26Service.create(formData)
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

    $scope.updateBoardForm = () => {
      $scope.view = "update";
    };

    $scope.updateBoard = (board) => {
      if(board.btitle && board.bcontent) {
        var formData = new FormData();  //multipart 데이터 객체
        formData.append("bno", board.bno);
        formData.append("btitle", board.btitle);
        formData.append("bcontent", board.bcontent);
        var battach = $("#battach")[0].files[0];  //엘리먼트 객체를 받음
        //var battach = document.querySelector("#battach").files[0];
        if(battach) {
          formData.append("battach", battach);
        }
        exam26Service.update(formData)
        .then((response) => {
            $scope.read(board.bno);
            $scope.view = "read";
        });
      }
    };

    $scope.deleteBoard = (bno) => {
      exam26Service.delete(bno)
        .then((response) => {
          $scope.getList(1);
          $scope.view = "list";
        })
    }
  });