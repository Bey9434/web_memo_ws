## web_memo_ws

### 概要

このプロジェクトは、メモの作成、取得、更新、削除を行う Web アプリである。

### 技術スタック

- フロントエンド:React
- バックエンド:Express.js
- データべース:SQLite
- テストツール:Jest,Supertest,MSW (Mock Service Worker)

### 機能一覧

#### CRUD 操作

1. **メモの作成（Create）**  
   新しいメモを追加する
2. **メモの取得(Read)**  
   メモを取得する
3. **メモの更新(Update)**  
   既存のメモを編集する
4. **メモの削除**  
   特定のメモを削除する

#### 注意点

- **タイトルの未入力**  
   メモ作成時や更新時にタイトルが必須。未入力の場合、タイトルの入力を促す表示がされる。

### 必要な環境

- Ubuntu:バージョン 22.04以降

- Node.js: バージョン 22.13.0 以降

- npm: バージョン 10.9.2 以降

- SQLite: バージョン 3.37.2 以降

### 実行方法

1. **リポジトリをクローン**
   
   リポジトリをクローンしたいフォルダーへ移動し、以下を実行する。

   ```sh
   cd your_folder/
   git clone https://github.com/Bey9434/web_memo_ws.git
   ```

2. **依存関係をインストール**
   
   ルートディレクトリ、フロントエンドディレクトリ、バックエンドディレクトリへ移動し、npm install を実行する。

   ```sh
   # ルートディレクトリで実行
   cd web_memo_ws/
   npm install

   # frontend ディレクトリで実行
   cd frontend
   npm install

   # backend ディレクトリで実行
   cd ../backend
   npm install
   ```

3. **データベースのセットアップ**
   
   初回はデータベースの設定をする必要があるので、以下を実行する。

   ```sh
    cd src/db/
    node index.js
    node clusters_table.js
   ```

4. **サーバーの起動**
   
   ルートディレクトリに戻りサーバーを起動する。

   ```sh
   cd ../../..
   npm start
   ```

5. **アプリケーションにアクセス**
   
   ブラウザを開き、以下の URL にアクセスをする。

   ```sh
   http://localhost:5173/
   ```

6. **テストの実行**
   
   プロジェクト全体のテストを実行する。
   コマンドはルートディレクトリで実行する。
   ```sh
   npm test
   ```

7. **動画**
   
https://github.com/user-attachments/assets/b40c3cdf-3e0e-426f-961d-690e1396a98f



