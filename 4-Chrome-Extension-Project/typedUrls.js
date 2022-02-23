// 클릭 시 해당 url을 새 탭에서 열어주는 함수
// chrome.tabs.create : https://developer.chrome.com/docs/extensions/reference/tabs/#method-create
function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href,
  });
  return false; //위의 create가 실패하면 false 리턴
}
