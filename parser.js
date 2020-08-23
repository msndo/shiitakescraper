// ===================================================== Data and Config
const dataResource = {
  // 星座リスト
  'dateAndconstellation': {
    '0120': 'aquarius',
    '0219': 'pisces',

    '0321': 'aries',
    '0420': 'taurus',
    '0521': 'gemini',
    '0622': 'cancer',
    '0723': 'leo',
    '0823': 'virgo',
    '0923': 'libra',
    '1024': 'scorpio',
    '1123': 'sagittarius',
    '1222': 'capricorn',
  }
}

const dataConfig = {
  // 接続先：「しいたけ占い」
  'siteInfo': {
    'shitake': {
      'domain': 'https://voguegirl.jp',
      'path': '/horoscope/shiitake'
    }
  }
}

// ===================================================== External Module
const request = require('request')
const {
  JSDOM
} = require('jsdom')

const url = require('url');


// ===================================================== Main Routine
//getConstellationFromDate('1123')
//requestSequence()
listenHTTP()


// ===================================================== Sub Routines

// mmdd(ex. 0109) をキーに星座名を返却
function getConstellationFromDate(mmddSrc) {

  const seriesDateConstellation = Object.keys(dataResource.dateAndconstellation).sort()

  const dateDefault = '0321'

  // 入力値バリデート (mmdd)
  const regex = /^[0-9]{4}$/
  const mmdd = (function() {
    if(!mmddSrc) { return dateDefault }
    if(!(mmddSrc.match(regex) && mmddSrc.match(regex).length)) { return dateDefault }

    const mmSrc = mmddSrc.substring(0, 2);
    if(Number(mmSrc) > 12 || Number(mmSrc) < 1) { return dateDefault }

    const ddSrc = mmddSrc.substring(2);
    if(Number(ddSrc) > 31 || Number(ddSrc) < 1) { return dateDefault }

    return mmddSrc
  })()

  let idConstellation
  seriesDateConstellation.some((dateConstellation, ix) => {
    if(mmdd < seriesDateConstellation[0]) {
      idConstellation = dataResource['dateAndconstellation'][seriesDateConstellation[0]]
      return true;
    }
    if(mmdd < dateConstellation) {
      idConstellation = dataResource['dateAndconstellation'][seriesDateConstellation[ix -1]]
      return true
    }
    if(mmdd >= seriesDateConstellation[seriesDateConstellation.length - 1]) {
      idConstellation = dataResource['dateAndconstellation'][seriesDateConstellation[seriesDateConstellation.length - 1]]
      return true;
    }
  })

  //console.log(ret)
  return idConstellation
}

// スクレイピング元サイトにアクセスし、スクレイピング結果を返す
function httpRequestSequence(nameConstellation) {
  const dataResponse = {
    "shiitake": {
      "summaryText": ""
    }
  }

  //console.log(nameConstellation)

  const siteInfo = dataConfig['siteInfo']['shitake']
  const sourceLocation = siteInfo['domain'] + siteInfo['path'] + '/' + nameConstellation + '/'

  return new Promise((resolve, reject) => {
    request(sourceLocation, (errorExternalAccess, response, body) => {
      if (errorExternalAccess) {
        console.error(errorExternalAccess)
        reject(errorExternalAccess)
      }

      try {
        const dom = new JSDOM(body, {url: siteInfo['domain']})

        const domSelector = (selector) => dom.window.document.querySelector(selector);

        dataResponse['shiitake'] = {
          'titleText': domSelector('.o-shiitake-detail__header .a-headline').textContent.trim(),
          'sourceLocation': sourceLocation,
          'headlineText': domSelector('.o-shiitake-detail__title-texts .a-headline').textContent.trim(),
          'termText': domSelector('.o-shiitake-detail__date').textContent.replace(/\s/g, '').trim(),
          'summaryText': domSelector('.o-shiitake-detail__section .a-text').textContent.trim(),
        }

        //console.log(JSON.stringify(dataResponse))

        // スクレイピング結果返却
        resolve(dataResponse)
      }
      catch (errorInSequence) {
        console.error(errorInSequence)
        reject(errorInSequence)
      }
    })
  })
}


function listenHTTP() {
  const http = require('http');
  const server = http.createServer(function (request, response) {

    //console.log(JSON.stringify(request.url))

    const url_parts = url.parse(request.url, true);
    const query = url_parts.query;
    const mmdd = query['birthmmdd']

    const nameConstellation = getConstellationFromDate(mmdd)
    //console.log('====', nameConstellation)

    httpRequestSequence(nameConstellation).then((dataResponse) => {
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.write(JSON.stringify(dataResponse, null , "  "))
      response.end();
    })
    .catch(() => {
      response.write('{}')
      console.error('FAIL')
    })
  })

  server.listen(process.env.PORT || 8080);
}
