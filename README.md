URLTweetViewer
==============

TLから有益なURL付きツイートのみ表示するChrome拡張機能  

・ツイッターを情報収集用に使いたい  
・ROM専したい  
・Chrome拡張機能がいい  
・好みにカスタマイズしたい

という自分のために作ったお粗末クライアント
  
-機能-  
ホームタイムラインからURL付きのツイートを抽出して表示する。  
添付のURLが「twitpic.com/ほにゃらら」(画像)のみだったら大体いらない情報なので除外。  
2分毎にTLを更新。  
  
-使用法-  
ConsumerKey, ConsumerSecret, AccessToken, TokenSecretは自分のものが必要  
https://dev.twitter.com/  
  
twitter.jsの以下に埋め込む  
    `Twitter.prototype = {
        consumerKey:    "",
        consumerSecret: "",
        accessToken:    "",
        tokenSecret:    ""
    };`

Chromeの設定＞ツール＞拡張機能＞デベロッパーモードにチェック＞パッケージ化されてない拡張機能を読み込む
