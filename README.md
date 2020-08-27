# しいたけスクレイパー

## これは
「しいたけ占い」からサマリー部のテキストを抽出してJSONで返却

## しいたけ占い
https://voguegirl.jp/horoscope/shiitake/sagittarius/

## アクセスURI

### デフォルト（牡羊座）

```
https://shiitakescraper.herokuapp.com/
```

### 8月1日(0801)生まれ = 獅子座

```
https://shiitakescraper.herokuapp.com/?birthmmdd=0801
```

## レスポンス例

```
{
  "shiitake": {
    "titleText": "しいたけ占い",
    "sourceLocation": "https://voguegirl.jp/horoscope/shiitake/leo/",
    "headlineText": "獅子座",
    "termText": "8月17日(月)~8月23日(日)の運勢は？",
    "summaryText": "「いつの間にか始まっている」のオレンジ色が出ています。今週の獅子座は悪い意味ではなくて、自分自身がちょっとぼーっとしている間に、「あ、結構大きな動きが始まっていっているぞ」と気づくようなことが多く出てきたりします。ただ、今週は「ぼーっとしていること」はよいことだと思ってほしいのです。というのは、獅子座は結構「第2スタートの人」であるからです。あなたは普段、ある程度は警戒心が強い人です。他人のこと、そして、自分の状況をよく調べてから物事をスタートしていくことが多いのですが、中には「よく考えないで返事をしたら始まった」とか、そういうこともある人なのです。むしろ、あなたにとって大事なことは「ノリ」でスタートすることが多い。そして、「あ、そうだ。私はこれをやんなきゃいけないんだったわ」と、少し遅れて自分の中で本格的にエンジンがかかるようなことも多いのです。"
  }
}
```


## 参考
- https://jsprimer.net/use-case/nodecli/helloworld/
- https://note.com/w0o0ps/n/n2eca493ced5d
- https://qiita.com/kents1002/items/e1b90c71897c55b8e870
- https://keruuweb.com/node-js%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92heroku%E3%81%AB%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4%E3%81%99%E3%82%8B/
- https://qiita.com/ledsun/items/0965a60f9bdff04f2fa0