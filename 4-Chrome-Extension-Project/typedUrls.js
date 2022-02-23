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
