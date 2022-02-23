// 클릭 시 해당 url을 새 탭에서 열어주는 함수
// chrome.tabs.create : https://developer.chrome.com/docs/extensions/reference/tabs/#method-create
function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href,
  });
  return false; //위의 create가 실패하면 false 리턴
}

//Top 10 Visited url 배열이 주어졌을 때 각각의 url들을 typedUrls.html에 띄워주기
function buildPopupDom(divName, data) {
  let popDiv = document.getElementById(divName);

  let ul = document.createElement('ul');
  popDiv.appendChild(ul);

  for (let i = 0, ie = data.length; i < ie; ++i) {
    let a = document.createElement('a');
    a.href = data[i];
    a.appendChild(document.createTextNode(data[i]));
    a.addEventListener('click', onAnchorClick);

    let li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li);
  }
}

//가장 핵심 함수
//Top 10 Visited url 배열
function buildTypedUrlList(divName) {
  let oneWeek = 1000 * 60 * 60 * 24 * 7;
  let oneWeekAgo = new Date().getTime() - oneWeek; //일주일 전

  let numRequestsOutstanding = 0;
  //History 를 찾기
  chrome.history.search(
    {
      'startTime': oneWeekAgo, //1주일 전 시각(ms)
      'text': '', //모든 item들 가지고 오기
    },
    function (historyItems) {
      //해당하는 url 찾기
      for (let i = 0; i < historyItems.length; ++i) {
        let url = historyItems[i].url;

        //클로저 <= url 방문정보중에 "typed"에 대한 정보를 얻기위해 씀
        let processVisitsWithUrl = function (url) {
          return function (visitItems) {
            //url 중에서 유저가 직접 입력해서 들어간 url을 찾아서 세주는 함수
            processVisits(url, visitItems); //url과 visitItems를 바인딩 시켜줌
          };
        };
        //url에 대한 세부 방문 정보(방문방법)
        chrome.history.getVisits({ url: url }, processVisitsWithUrl(url));
        numRequestsOutstanding++;
      }
      // numRequestsOutstanding 이 0 이 되는 순간 최종 결과 보여주기
      if (!numRequestsOutstanding) {
        onAllVisitsProceed(); //종료 함수
      }
    }
  );

  //url: 반복횟수
  let urlToCount = {};

  //url 중에서 유저가 직접 입력해서 들어간 url을 찾아서 세주는 함수
  let processVisits = function (url, visitItems) {
    for (let i = 0, ie = visitItems.length; i < ie; ++i) {
      if (visitItems[i].transition != 'typed') {
        continue;
      }
      if (!urlToCount[url]) {
        urlToCount[url] = 0;
      }
      urlToCount[url]++;
    }
    if (!--numRequestsOutstanding) {
      //종료. 최종 배열 만들기 함수 호출
      onAllVisitsProceed();
    }
  };

  //배열 만들기
  let onAllVisitsProceed = function () {
    urlArray = [];
    for (let url in urlToCount) {
      urlArray.push(url);
    }
    //url 입력 횟수대로 정렬
    urlArray.sort(function (a, b) {
      return urlToCount[b] - urlToCount[a];
    });
    //만들어진 urlArray를 DOM에 뿌리기
    buildPopupDom(divName, urlArray.slice(0, 10));
  };
}

document.addEventListener('DOMContentLoaded', function () {
  //Top 10 visited url 배열을 만들어주는 함수
  buildTypedUrlList('typedUrl_div'); //buildPopupDom을 이 안에서 호출
});
