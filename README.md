# React、GraphQL、Prisma、Jest/Testing Library、Storybook/Tailwind CSS(手動作成)/Figma/App router学習用複合アプリ

主な技術とそのバージョン

## フロントエンド
### メインライブラリ
- React: `^19.0.0`
- TypeScript: `~5.7.2`
- Vite: `^6.2.0`

### GraphQL関連
- @apollo/client: `^3.13.4`
- @apollo/react-hooks: `^4.0.0`
- apollo-boost: `^0.4.9`
- graphql: `^15.10.1`

### 開発ツール
- ESLint: `^9.21.0`
- @vitejs/plugin-react: `^4.3.4`
- typescript-eslint: `^8.24.1`

## バックエンド
### GraphQLサーバー
- apollo-server: `^3.13.0`
- graphql: `^16.10.0`

### 実行環境
- Node.js（Apollo Server v3をサポートするバージョン）

## 特徴
- フロントエンドはVite + React + TypeScriptの構成
- GraphQLクライアントとしてApollo Clientを使用
- バックエンドはApollo Serverを使用したGraphQLサーバー


<img width="838" alt="スクリーンショット 2025-03-17 14 30 47" src="https://github.com/user-attachments/assets/ae37cf0a-6e69-4950-85da-26a22090acaa" />


<img width="1677" alt="スクリーンショット 2025-03-17 14 26 56" src="https://github.com/user-attachments/assets/9738b1c2-7794-4fb9-9ad2-4711c1695e1b" />



## 【2025/03/20追加】Prismaを作成

<img width="1164" alt="スクリーンショット 2025-03-20 4 24 07" src="https://github.com/user-attachments/assets/9df7025a-7008-4e14-b771-e2aa860d0b5e" />


## 【2025/03/20追加】Jest/Testing Libraryを作成

<img width="820" alt="スクリーンショット 2025-03-20 16 04 08" src="https://github.com/user-attachments/assets/6f2d9a47-14fc-4ad1-b373-4e46e29bd8d1" />

![スクリーンショット 2025-03-20 16 44 15](https://github.com/user-attachments/assets/73578f86-29c0-478b-b8aa-b9487f1f109c)


## 【2025/03/21追加】Storybook/Tailwind CSS（手動）を作成

![スクリーンショット 2025-03-21 14 00 05](https://github.com/user-attachments/assets/4154d202-8caf-4548-824d-0792adbeaa45)


## 【2025/03/22追加】Figma動作確認

<img width="1678" alt="スクリーンショット 2025-03-22 14 10 20" src="https://github.com/user-attachments/assets/1d30acf6-5c3a-478a-85ad-36f7ebd2a112" />

<img width="1670" alt="スクリーンショット 2025-03-22 14 12 09" src="https://github.com/user-attachments/assets/0973eb8e-b73b-448a-b16d-dc6d7a2e470e" />

https://www.figma.com/design/qokGDtOnklrgpzJpeDtyuH/Top%E3%83%9A%E3%83%BC%E3%82%B8?t=wggTMwTG3lh6xnda-1


## 【2025/03/22追加】App router学習

![スクリーンショット 2025-03-22 20 44 40](https://github.com/user-attachments/assets/d4c98f20-0af0-40d1-ab49-f51b744d54a4)

## 【Claude】Next.js (App Router) のクライアントサイドとサーバーサイドの仕組み

Webの基本から丁寧に説明します。図も含めて、初めての方にもわかりやすく解説していきます。

![スクリーンショット 2025-03-22 21 45 31](https://github.com/user-attachments/assets/e443c111-41ff-414b-843b-f71357f498e7)

### Webの基本的な仕組み

まずはWebの基本から説明します：

#### 1. Webの基本的な仕組み

Webサイトを見るときには、大きく分けて2つの場所でプログラムが動いています：

- **クライアントサイド**：あなたのパソコンやスマホ上のブラウザ（Chrome、Safari等）
- **サーバーサイド**：インターネット上のコンピューター（サーバー）

#### 2. 一般的なWebサイトの流れ

1. あなたがブラウザでURLを入力します（例：www.example.com）
2. ブラウザがインターネットを通じてそのサーバーにリクエストを送ります
3. サーバーがリクエストを処理して、HTMLやJavaScriptなどのファイルを返します
4. ブラウザがそれらのファイルを受け取り、画面に表示します

### Next.jsとは何か？

Next.jsは、React（JavaScriptのライブラリ）をベースにした**Webアプリケーションフレームワーク**です。特徴的なのは、サーバーサイドとクライアントサイドの両方で動作するコードを書けることです。

### Next.js (App Router) のサーバーサイドとクライアントサイド

#### サーバーサイド（Webサーバー上）

**サーバーサイド**とは、インターネット上のリモートコンピューター（サーバー）で動くプログラムのことです：

- **場所**：Vercel、AWS、Google Cloudなどのクラウドサービス上
- **環境**：主にNode.jsという実行環境で動きます
- **役割**：
  - HTMLを生成する
  - データベースからデータを取得する
  - 外部APIと通信する
  - ユーザー認証を処理する

Next.jsの場合、**サーバーコンポーネント**がここで動作します。重要なのは、この「サーバー」はAPIサーバーとは少し違います。Next.jsのサーバーは：

1. Webページのリクエストを受け取る
2. サーバーコンポーネントを実行してHTMLを生成する
3. 生成したHTMLをブラウザに送る

一般的なAPIサーバーが「データだけ」を返すのに対し、Next.jsのサーバーは「表示用のHTML」も生成して返します。

#### クライアントサイド（ユーザーのブラウザ上）

**クライアントサイド**とは、あなたのパソコンやスマホのブラウザ上で動くプログラムのことです：

- **場所**：ユーザーのデバイス（パソコン、スマホなど）
- **環境**：Webブラウザ（Google Chrome、Safari、Firefox、Edgeなど）
- **役割**：
  - ユーザーのクリックや入力に反応する
  - 画面の表示を更新する
  - フォームのバリデーション（入力チェック）
  - アニメーションやインタラクションの処理

Next.jsの場合、**クライアントコンポーネント**がここで動作します。

### 具体的な例で理解する

#### 簡単なブログサイトの例

単純なブログサイトがどのように動作するか見てみましょう：

##### 1. ユーザーが記事一覧ページにアクセスする場合：

**サーバーサイド（Vercel上のNext.jsサーバー）で起きること**：
- Next.jsサーバーがリクエストを受け取る
- データベース（例：PostgreSQL）から記事一覧を取得する
- サーバーコンポーネントで記事一覧のHTMLを生成する
- 生成したHTMLをブラウザに送る

**クライアントサイド（ユーザーのChrome等）で起きること**：
- ブラウザがHTMLを受け取り、画面に表示する
- ユーザーはページを見ることができる

##### 2. ユーザーが「いいね」ボタンをクリックする場合：

**クライアントサイド（ユーザーのブラウザ）で起きること**：
- クライアントコンポーネントのボタンがクリックを検知
- 「いいね」カウントを+1して画面を更新
- サーバーにいいね情報を送信

**サーバーサイド（Vercel上のNext.jsサーバー）で起きること**：
- 「いいね」情報を受け取る
- データベースの「いいね」カウントを更新する

### Next.js (App Router) のコンポーネントタイプ

Next.jsのApp Routerでは2種類のコンポーネントがあります：

#### 1. サーバーコンポーネント（デフォルト）

App Routerでは、特に指定がなければすべてのコンポーネントは「サーバーコンポーネント」です。

```jsx
// app/blogs/page.tsx（サーバーコンポーネント）
export default async function BlogsPage() {
  // このコードはVercelなどのサーバー上で実行される
  
  // データベースからデータを取得（サーバー上でのみ可能）
  const blogs = await database.getAllBlogs();
  
  return (
    <div>
      <h1>ブログ一覧</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 2. クライアントコンポーネント

ファイルの先頭に `"use client"` と書くと、そのコンポーネントは「クライアントコンポーネント」になります。

```jsx
// components/LikeButton.jsx
"use client" // これでブラウザ上で実行されるコンポーネントになる

import { useState } from 'react';

export default function LikeButton({ initialLikes }) {
  // このコードはユーザーのブラウザ上で実行される
  const [likes, setLikes] = useState(initialLikes);
  
  function handleClick() {
    setLikes(likes + 1);
    // サーバーに「いいね」情報を送信
    fetch('/api/like', { method: 'POST', body: JSON.stringify({ likes: likes + 1 }) });
  }
  
  return (
    <button onClick={handleClick}>
      👍 いいね！ ({likes})
    </button>
  );
}
```

### よくある質問に答えます

#### 質問: Vercel上のNode.jsサーバーはAPIサーバー（バックエンド）なの？

Next.jsを動かすVercel上のNode.jsサーバーは、**APIサーバーとWebサーバーの両方の役割を持ちます**。

- **Webサーバーとしての役割**：ブラウザからのリクエストを受け取り、HTMLを生成して返す
- **APIサーバーとしての役割**：クライアントコンポーネントからのデータリクエストを処理する

従来のWebサイトでは「フロントエンド」と「バックエンド」を明確に分けていましたが、Next.jsはその境界をあいまいにして、開発をシンプルにしています。

#### 質問: サーバーコンポーネントとクライアントコンポーネントはどう使い分ければいいの？

基本的な使い分け方：

- **サーバーコンポーネント**（デフォルト）を使うケース:
  - データベースからデータを取得する部分
  - APIから情報を取得する部分
  - ページの基本的なレイアウト
  - SEO対策が必要な部分

- **クライアントコンポーネント**（"use client"）を使うケース:
  - ボタンやフォームなど、ユーザーの操作に反応する部分
  - アニメーションがある部分
  - ユーザー入力に応じて表示を変える部分
  - ブラウザのAPIを使う部分（localStorage、window.locationなど）

### まとめ

1. **Next.js**は、React（JavaScriptのライブラリ）を使ったWebアプリケーションフレームワークです。

2. **サーバーサイド**（Vercel等のサーバー上）では：
   - サーバーコンポーネント（デフォルト）が動作
   - データベースからデータを取得
   - HTMLを生成してブラウザに送信

3. **クライアントサイド**（Chrome等のブラウザ上）では：
   - クライアントコンポーネント（"use client"）が動作
   - ユーザーのクリックや入力に反応
   - 画面の一部を動的に更新

4. **Next.jsのサーバー**は単なるAPIサーバーではなく、HTMLを生成して返すWebサーバーの役割も持ちます。

この組み合わせにより、Next.jsはユーザー体験の良いWebアプリケーションを簡単に作れる強力なフレームワークになっています。


【Claude】Next.js App RouterのStreamingとReactのSuspense

![スクリーンショット 2025-03-24 1 02 18](https://github.com/user-attachments/assets/d46c3531-067c-4ae8-bad6-b7c46ffe2561)






