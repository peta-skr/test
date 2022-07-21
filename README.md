# 使用言語とか

クライアント：React

サーバー：node.js v16.15.1

データベース: mysql

認証は firebase の auth を使用
細かいバージョンやライブラリは package.json を参照

# 動作

## ログイン・新規登録

1. クライアントで認証ボタンを押してアカウントを選択
2. firebase に飛ばして、ユーザー認証をする
3. firebase からアクセストークンを得る
4. クライアントからサーバーへアクセストークンを送信
5. サーバーは firebase Admin を使用してアクセストークンを検証し、uid を得る。
6. 得た uid が DB に格納されているならログイン、格納されていないなら新規登録。
7. クライアントへレスポンスを返す

# 使用法

- Mysql をインストール(xampp の htdocs に入れてできるかは試していない)
- server と frontend で npm install する。
- firebase でプロジェクトを作成し、authentication を押して、sign-in method で新しいプロバイダをクリックし、google を追加
- frontend フォルダ内の config フォルダに firebase-config.js を作成し、firebase から firebaseconfig をコピーする。
- server フォルダ内に.env ファイルを作成して.env.example を参考にしながら自分の DB の設定を打ち込む。
- server フォルダ内の config フォルダに serviceAccount.json を作成
- google cloud へ行き、サイトバーの IAM と管理からサービスアカウントを選択し、アカウント作成。名前だけ入れたら ok なはず
- そのアカウントをクリックし、キーに行く。そして、鍵を追加を押して、JSON を選択
- そしたら、ファイルがダウンロードされるのでその中身を firebase-config.js にペーストする。
- server 側も frontend 側も npm start で実行できるはず。
