//모듈 가져오기
const axios = require('axios'); //패키지 가져오기
const cheerio = require('cheerio');

function crawler() {
  const url = `https://news.daum.net/`;

  //axios로 get 요청 보내기
  axios.get(url).then(res => {
    // console.log(res);
    // console.log(res.status); // 200 (잘 받았다는 뜻)
    if (res.status == 200) {
      //크롤링
      let crawledNews = []; // [{title: "..."}, {summary: "..."}, {img: "..."}]

      // res.data에 있는 tag를 cheerio로 검색해서 변수에 담기
      // const $ = cheerio.load(res.data);
      // const $newsList = $('');
    } else {
      console.log('404 : 서버 응답오류!');
    }
  });
}

crawler();
