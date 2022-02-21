$(document).ready(function () {
  //데이터 정의

  //공의 개수
  let circleNumber = 0;

  //공의 종류 - 지름, 반지름, 색, 움직이는 속도
  let circleTypes = {
    'option': ['color', 'width', 'border-radius', 'speed'],
    'small': ['black', 5, 2.5, 3000], //3000은 한 지점에서 다른 지점으로 움직일때 걸리는 millisecond임
    'medium': ['blue', 15, 7.5, 4000],
    'large': ['yello', 30, 15, 5000],
  };

  //e.g circleChoice 라는 변수에 small
  //circleTypes[circleChoice][0] = 색
  //circleTypes[circleChoice][0] = 지름
  //circleTypes[circleChoice][0] = 반지름
  //circleTypes[circleChoice][0] = 속도

  //시간을 찍어주는 변수
  let t = 0;

  //게임 실행 여부
  let gameOn = false;

  //마우스 좌표
  let mouseX;
  let mouseY;

  //마우스 움직임을 좌표에 담아주는 함수
  $('body').mousemove(function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
  });

  //타이머 함수
  function timer() {
    if (gameOn == true) {
      //0.01초 (10ms) 마다 t 값을 0.01 증가
      //증가된 t 값을 html(.timer)에 찍어줌
      setTimeout(function () {
        t = t + 0.01;
        $('.timer').html(`<h1><center>${t.toFixed(2)}</center></h1>`);
        timer(); // 반복실행
      }, 10); //10ms마다 실행
    }
  }

  //시작 버튼 함수
});
