const axios = require('axios');
const cheerio = require('cheerio');

function crawler() {
  const url = `https://www.melon.com/chart/`;
  axios.get(url).then(res => {
    if (res.status === 200) {
      let crawledChart = [];
      const $ = cheerio.load(res.data);
      const $chartList = $('#lst50');
      // console.log($chartList);
      $chartList.each(function (i) {
        crawledChart[i] = {
          rank: $(this).find(`#lst50 > td > div > span.rank`).text(),
          img: $(this).find(`#lst50 > td > div > a > img`).attr('src'),
          title: $(this)
            .find(`#lst50 > td > div > div > div.ellipsis.rank01 > span > a`)
            .text(),
          signer: $(this)
            .find(`#lst50 > td > div > div > div.ellipsis.rank02 > a`)
            .text(),
          album: $(this)
            .find(
              `#lst50 > td > div.wrap > div.wrap_song_info > div.ellipsis.rank03 > a`
            )
            .text(),
        };
      });
      console.log(crawledChart);
    } else {
      console.log('404: error');
    }
  });
}

crawler();
