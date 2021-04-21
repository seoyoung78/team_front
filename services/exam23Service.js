angular.module("app")
  //[서비스 선언 방법1]  
.factory("counterSeviceByFactory", function() {
    //숨김 데이터 - 밖에 노출x
    let count = 0;    //var 대신 사용 가능한 형태
    
    //서비스 객체를 리턴
    return {
      addCount: function() {  //화살표 함수 사용x -> this가 인식하는게 다름
        count++;
      },

      getCount: function() {
        return count;
      }
    };
  })

  //[서비스 선언 방법2]
  .service("counterSeviceByService", function() {
    this.count = 0;
    this.addCount = () => {this.count++};
    this.getCount = () => {return this.count};
  })
  
  //[서비스 선언 방법3]
  .provider("counterSeviceByProvider", function() {
    //숨김 데이터
    let count = 0;

    //프로바이더 객체 리턴
    return {
      //서비스 객체의 초기화 함수
      setCount:function(value) {
        count = value;
      },

      //서비스 객체 리턴
      $get: function() {
        return {
          addCount: function() {
            count++;
          },
          getCount: function() {
            return count;
          }
        };
      }
    };
  });