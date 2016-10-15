# md-editor
Electronで作るマークダウンエディタ。Electronの勉強のために作成。

![md-editor](./md-editor.png)

## 機能
* Markdown記法で入力されたテキストのプレビュー表示
* mdファイルの読み込みと保存

## 使用したモジュール
* CodeMirror - エディタ
* marked - MarkdownをHTMLに変換
* github-markdown-css - Markdownをプレビュー表示する際に適用されるCSS

## 起動方法（通常）
1. プロジェクトフォルダにて`$ npm install`
2. `$ gulp build`でJSをビルド
3. `$ npm start`で起動する

## 起動方法（開発）
1. プロジェクトフォルダにて`$ npm install`
2. `$ gulp`を実行すると、以降JSファイルを監視し編集する度に差分をビルドする
3. `$ npm start`で動作確認

## 今後の展望
* ~~.mdファイルの読み込みと保存の実装~~ => 実装済み（既存ファイル編集後の上書き保存は追加実装必要）
* エディタとプレビューでスクロールがずれる問題の修正
* [office-ui-fabric-react](http://dev.office.com/fabric)を使って、見た目をOfficeぽくする。
* CSSやJSをnode_modulesから直接参照してる部分の修正
* ディレクトリ構造の修正
* テストを書く
