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

  //공을 생성해주는 함수
  function createCircle() {
    circleNumber++; //공 개수 하나 증가

    //small medium large 셋 중 하나를 랜덤하게 생성
    //1~3 까지 정수 중 하나를 랜덤으로 생성
    let randomOneThree = Math.floor(Math.random() * 3) + 1; //1 or 2 or 3

    if (randomOneThree === 1) {
      var circleChoice = 'small';
    } else if (randomOneThree === 2) {
      var circleChoice = 'medium';
    } else if (randomOneThree === 3) {
      var circleChoice = 'large';
    }

    //공의 id 값을 지정
    let circleName = 'circle' + circleNumber;

    //랜덤 circleChoice에 맞는 color, 지름, 반지름, speed 변수에 담기
    let circleColor = circleTypes[circleChoice][0];
    let circleSize = circleTypes[circleChoice][1];
    let circleRadius = circleTypes[circleChoice][2];
    let circleSpeed = circleTypes[circleChoice][3];

    //생성된 공은 각기 다른 크기 가짐. 공이 움직일 수 있는 범위(가로, 세로) 지정
    let moveableWidth = $('body').width() - circleSize; //공의 지름만큼 뺀 나머지 만큼만 화면에서 움직 일 수 있다.
    let moveableHeight = $('body').height() - circleSize;

    //공이 움직일 수 있는 가로 길이 moveableWidth
    //공이 찍힐 수 있는 가로 좌표 0 ~ moveableWidth이다. 그러므로 아래 처럼 Math.random()을 곱해줘서 랜덤값을 취한다.

    //공의 초기 시작 좌표
    let circlePositionLeft = (moveableWidth * Math.random()).toFixed(); //(공 움직일 수 있는 거리 x 0~1사이 랜덤) 그리고 소수점버림
    let circlePositionTop = (moveableHeight * Math.random()).toFixed();

    //html에 위의 값들 찍어주기
    let newCircle = `<div class='circle' id="${circleName}"></div>`;
    $('body').append(newCircle);

    //css값 주기
    $('#' + circleName).css({
      'background-color': circleColor,
      'width': circleSize + 'vmin',
      'height': circleSize + 'vmin',
      'border-radius': circleRadius + 'vmin',
      'top': circlePositionTop + 'px',
      'left': circlePositionLeft + 'px',
    });

    // 여기 위 까지가 랜덤 공 생성 ~ 속성지정까지 코드이다

    //이제 공과 마우스가 맞닿으면 끝나도록 한다.
    //1ms 마다 반복하며 마우스와의 거리 계산하는 함수
    function timeCirclePosition(circleTrackId) {
      setTimeout(function () {
        let currentCirclePosition = $(circleTrackId).position();
        let calculateRadius = parseInt($(circleTrackId).css('width')) * 0.5;

        //점과 점 사이 거리 수학계산 - 공의 어느 부분이라도 맞닿는곳 계산
        let distanceX = mouseX - (currentCirclePosition.left + calculateRadius); // left는 x축 방향으로 현재 화면 상에 떨어진 거리, top은 공이 y축 방향으로 현재 화면 상에 떨어진 거리
        let distanceY = mouseY - (currentCirclePosition.top + calculateRadius); // distanceX,Y는 공의 중심과 마우스와의 거리가 아닌, 공 자체와 마우스와의 거리이다. (mouseX,mouseY에 반지름(calculatedRadius) 만큼 더한 값 뺏기 때문이다.)
        //마우스와 공이 맞 닿으면
        if (
          Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)) <=
          calculateRadius
        ) {
          //부딪힌 공 빨간색으로 표시
          $(circleTrackId).removeClass('circle').addClass('redcircle');
          $(circleTrackId).css('background-color', 'red');

          console.log('게임 끝');
          endgame();
        }
        timeCirclePosition(circleTrackId); //반복실행
      }, 1);
    }
    timeCirclePosition('#' + circleName);

    animateCircle(circleName, circleSpeed, circleSize);

    //3초에 한번 공 랜덤 생성
    setTimeout(function () {
      if (gameOn == true) {
        createCircle();
      }
    }, 3000);
  }

  function animateCircle(circleId, speed, circleSize) {
    //animate() - 위치를 이동시키는 함수
    let moveableWidth = $('body').width() - circleSize;
    let moveableHeight = $('body').height() - circleSize;
    let circleMoveLeft = (moveableWidth * Math.random()).toFixed();
    let circleMoveTop = (moveableHeight * Math.random()).toFixed();

    //jquery animate 함수 인자 참조(css객체, duration, 콜백함수)
    $('#' + circleId).animate(
      {
        left: circleMoveLeft,
        top: circleMoveTop,
      },
      speed,
      function () {
        animateCircle(circleId, speed, circleSize); //계속 반복
      }
    );
  }

  //게임 오버 함수
  function endgame() {
    if (gameOn == true) {
      gameOn = false;
      updateScores(t); //시간을 인자로 넘겨줌
      $('.circle').remove(); //나머지 원은 지우기
      $('.redcircle').stop(); //내가 건드린 원은 멈추기
    }
  }

  let resetButton = `<div class='resetButton center'><h2>Play Again</h2></div>`;
  let highScore1 = 0.0;
  let highScore2 = 0.0;
  let highScore3 = 0.0;
  let highScore4 = 0.0;
  let highScore5 = 0.0;
  //update score 함수- 시간을 인자로 넘겨줌
  function updateScores(newScore) {
    //방금 플레이에서 얻은 점수는 빨간색으로 표시할 예정
    let redScore;
    //newScore가 highScore1 보다 높은 경우
    if (newScore > highScore1) {
      redScore = 'score1';
      highScore5 = highScore4;
      highScore4 = highScore3;
      highScore3 = highScore2;
      highScore1 = newScore;
    }
    //newScore가 highScore2 보다 높은 경우
    else if (newScore > highScore2) {
      redScore = 'score2';
      highScore5 = highScore4;
      highScore4 = highScore3;
      highScore3 = highScore2;
      highScore2 = newScore;
    }
    //newScore가 highScore3 보다 높은 경우
    else if (newScore > highScore3) {
      redScore = 'score3';
      highScore5 = highScore4;
      highScore4 = highScore3;
      highScore3 = newScore;
    }
    //newScore가 highScore4 보다 높은 경우
    else if (newScore > highScore4) {
      redScore = 'score4';
      highScore5 = highScore4;
      highScore4 = newScore;
    }
    //newScore가 highScore5 보다 높은 경우
    else if (newScore > highScore5) {
      redScore = 'score5';
      highScore5 = newScore;
    }

    let highScorePlace1 = `
		<div class='score center' id='score1'><h2>${highScore1.toFixed(2)}</h2></div>`;
    let highScorePlace2 = `
		<div class='score center' id='score2'><h2>${highScore2.toFixed(2)}</h2></div>`;
    let highScorePlace3 = `
		<div class='score center' id='score3'><h2>${highScore3.toFixed(2)}</h2></div>`;
    let highScorePlace4 = `
		<div class='score center' id='score4'><h2>${highScore4.toFixed(2)}</h2></div>`;
    let highScorePlace5 = `
		<div class='score center' id='score5'><h2>${highScore5.toFixed(2)}</h2></div>`;

    //highScorePlace1 ~ highScorePlace5 를 append 하기
    $('#highscores').append(
      highScorePlace1,
      highScorePlace2,
      highScorePlace3,
      highScorePlace4,
      highScorePlace5,
      resetButton
    );
    $('#' + redScore).css('color', 'red');
    $('#highscores').toggle(); //안보이는 건 -> 보이게 , 보이는 건 -> 안보이게
    // $('.resetButton').click(function () {
    //   gameReset();
    // });
  }

  //게임 리셋 함수
});
