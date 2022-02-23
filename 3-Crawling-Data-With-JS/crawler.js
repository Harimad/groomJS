//모듈 가져오기
const axios = require('axios'); //패키지 가져오기
const cheerio = require('cheerio');

function crawler() {
  const url = `https://koreajoongangdaily.joins.com/section/englishStudy`;

  //axios로 get 요청 보내기
  axios.get(url).then(res => {
    // console.log(res.status); // 200 (잘 받았다는 뜻)
    if (res.status == 200) {
      //크롤링
      let crawledNews = []; // [{title: "..."}, {summary: "..."}, {img: "..."}]

      const $ = cheerio.load(res.data); // res.data에 있는 tag를 cheerio로 검색해서 변수에 담기
      const $newsList = $(
        '#main-second-content > div.article-left > div.mid-article3'
      );

      // console.log($newsList);

      $newsList.each(function (i) {
        crawledNews[i] = {
          title: $(this).find(`a > div > h1 > span`).text(),
          summary: $(this).find(`a > div > p`).text(),
          img: $(this).find(`a > span.img-mask-wrap > img`).attr('src'),
        };
      });
      crawledNews.forEach(v => {
        console.log(v);
      });
    } else {
      console.log('404 : 서버 응답오류!');
    }
  });
}
crawler();

//기사 영역
//#main-second-content > div.article-left > div.mid-article3
//제목
// a > div > h1 > span
//본문
// a > div > p
//이미지
// a > span.img-mask-wrap > img
