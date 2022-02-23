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
  let popDiv = document.querySelector('#' + divName);

	let ul = document.createElement('ul');
	popDiv.appendChild(ul);

	for (let i = 0, ie = data.length; i < ie, ++i) {
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
function buildTypedUrlList() {
	let oneWeek = 1000 * 60 * 60 * 24 * 7;
	let oneWeekAgo = (new Date).getTime() - oneWeek; //일주일 전

	let numRequestsOutstanding = 0;
	//History 를 찾기
	chrome.history.search({
		startTime: oneWeekAgo, //1주일 전 시각(ms)
		text: ''
	}, function(historyItems) {
		//해당하는 url 찾기
		for (let i = 0; i < historyItems.length; ++i) {
			let url = historyItems[i].url;

			let processVisitsWithUrl = function(url) {
				return function(visitItems) {
					//url 중에서 유저가 직접 입력해서 들어간 url을 찾아서 세주는 함수
					processVisits(url, visitItems);
				};
			};
			//url에 대한 세부 방문 정보
			chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
			numRequestsOutstanding++;
		}

		if(!numRequestsOutstanding) {
			//종료 함수
		}
	})

	//url 중에서 유저가 직접 입력해서 들어간 url을 찾아서 세주는 함수

	//배열 만들기

	//buildPopupDom 호출
}

document.addEventListener('DOMContentLoaded', function() {
	//Top 10 visited url 배열을 만들어주는 함수
	buildTypedUrlList('typedUrl_div'); //buildPopupDom을 이 안에서 호출
})
