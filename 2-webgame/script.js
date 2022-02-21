$(document).ready(function () {
  //데이터 정의

  //공의 개수
  let circleNumber = 0;

  //공의 종류 - 지름, 반지름, 색, 움직이는 속도
  let circleTypes = {
    'option': ['color', 'width', 'border-radius', 'speed'],
    'small': ['black', 5, 2.5, 3000], //3000은 한 지점에서 다른 지점으로 움직일때 걸리는 millisecond임
    'medium': ['blue', 15, 7.5, 4000],
    'large': ['yellow', 30, 15, 5000],
  };

  //e.g circleChoice 라는 변수에 small
  //circleTypes[circleChoice][0] = 색
  //circleTypes[circleChoice][1] = 지름
  //circleTypes[circleChoice][2] = 반지름
  //circleTypes[circleChoice][3] = 속도

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
  //for test
  //timer();

  //시작 버튼 함수 - 누르면 이 클래스가 없어짐
  $('.startbutton').click(function () {
    $('.startbutton').fadeToggle('slow', function () {
      gameOn = true;
      timer();
      $('.space').mouseenter(function () {
        endgame(); //게임끝내는 함수 - space로 마우스가 들어가면 게임 끝내라
      });
      createCircle(); //공을 생성해주는 함수
    });
  });
});

//공을 생성해주는 함수
function createCircle() {
  circleNumber++; //공 개수 하나 증가

  //small medium large 셋 중 하나를 랜덤하게 생성
  //1~3 까지 정수 중 하나를 랜덤으로 생성
  let randomOneThree = Math.floor(Math.random() * 3) + 1; //1 or 2 or 3

  if (randomOneThree === 1) {
    let circleChoice = 'small';
  } else if (randomOneThree === 2) {
    let circleChoice = 'medium';
  } else if (randomOneThree === 3) {
    let circleChoice = 'large';
  }

  //공의 id 값을 지정
  let circleName = 'circle' + circleNumber;

  //랜덤 circleChoice에 맞는 color, 지름, 반지름, speed 변수에 담기
  let circleColor = circleTypes[circleChoice][0];
  let circleSize = circleTypes[circleChoice][1];
  let circleRadius = circleTypes[circleChoice][2];
  let circleSpeed = circleTypes[circleChoice][3];

  //생성된 공은 각기 다른 크기 가짐. 공이 움직일 수 있는 범위(가로, 세로) 지정
  let moveableWidth = $('body').width - circleSize; //공의 지름만큼 뺀 나머지 만큼만 화면에서 움직 일 수 있다.
  let moveableHeight = $('body').Height - circleSize;

  //공이 움직일 수 있는 가로 길이 moveableWidth
  //공이 찍힐 수 있는 가로 좌표 0 ~ moveableWidth이다. 그러므로 아래 처럼 Math.random()을 곱해줘서 랜덤값을 취한다.

  //공의 초기 시작 좌표
  let circlePositionLeft = (moveableWidth * Math.random()).toFixed(); //(공 움직일 수 있는 거리 x 0~1사이 랜덤) 그리고 소수점버림
  let circlePositionTop = (moveableHeight * Math.random()).toFixed();
}
