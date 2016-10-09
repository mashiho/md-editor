# md-editor
Electronで作るマークダウンエディタ。Electronの勉強のために作成。

![md-editor](./md-editor.png)

## 機能
現時点ではMarkdown記法で入力されたテキストをプレビュー表示するだけ。

## 使用したモジュール
* CodeMirror - エディタ
* marked - MarkdownをHTMLに変換
* github-markdown-css - Markdownをプレビュー表示する際に適用されるCSS

## 起動方法
1. プロジェクトフォルダにて`$ npm install`
2. `$ npm start`で起動する

## 今後の展望
* .mdファイルの読み込みと保存の実装
* エディタとプレビューでスクロールがずれるの修正
* [office-ui-fabric-react](http://dev.office.com/fabric)を使って、見た目をOfficeぽくする。
* CSSやJSをnode_modulesから直接参照してる部分の修正
* テストを書く
