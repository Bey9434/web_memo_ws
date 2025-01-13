## web_memo_ws

### 概要

このプロジェクトは、メモの作成、取得、更新、削除を行う Web アプリである。

### 技術スタック

- フロントエンド:React
- バックエンド:Express.js
- データべース:SQLite
- テストツール:Jest,Supertest,MSW (Mock Service Worker)

### 機能一覧

#### CLUD 操作

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

- Node.js: バージョン 22.13.0 以降

- npm: バージョン 10.9.2 以降

- SQLite: バージョン 3.37.2 以降

### 実行方法

1. **リポジトリをクローン**

   ```sh
   git clone https://github.com/Bey9434/memo-app.git
   ```

2. **依存関係をインストール**

   ```sh
   # ルートディレクトリで実行
   cd web-app/
   npm install

   # backendディレクトリで実行
   cd web-app/backend
   npm install

   # frontendディレクトリで実行
   cd web-app/frontend
   npm install
   ```

3. **データベースのセットアップ**
   初回はデータベースの設定をする必要があるので、以下を実行する。

   ```sh
    cd web-app/backend/src/db/
    node index.js
   ```

4. **サーバーの起動**

   ```sh
   cd web-app/
   npm start
   ```

5. **テストの実行**

   ```sh
   cd web-app/
   npm test
   ```
