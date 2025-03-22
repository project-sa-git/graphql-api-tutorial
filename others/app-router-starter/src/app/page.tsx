/**
 * Server Component
 *
 * サーバーサイド（Webサーバー上）で実行されるコンポーネント
 * 特徴：
 * - データベースへの直接アクセスが可能
 * - 環境変数に安全にアクセス可能
 * - ユーザーのブラウザにJavaScriptを送信しない
 * - パフォーマンスが優れている
 *
 * Next.jsのApp Routerでは、デフォルトで全てのコンポーネントはServer Componentsです。
 * このページコンポーネントは、サーバーサイドでレンダリングされ、
 * クライアントにHTMLとして送信されます。
 *
 */
import Link from 'next/link'
import RoutingButton from 'components/RoutingButton'

/**
 * トップページコンポーネント
 *
 * このページでは、Next.jsの異なるページ遷移方法のデモンストレーションを行います。
 * 1. Linkコンポーネントを使用した宣言的な遷移
 * 2. RoutingButtonコンポーネントを使用したプログラム的な遷移
 *
 * それぞれの遷移方法には特徴があり、用途に応じて使い分けることができます。
 */
export default function Page() {
  // エラーハンドリングのデモンストレーション用
  // throw new Error('エラーが発生しました')

  return (
    <div>
      <h1>This is Top Page!</h1>
      {/* 
        Linkコンポーネント:
        - ページのプリフェッチが自動的に行われる（パフォーマンス最適化）
          - ユーザーがリンクにマウスを重ねると、Next.jsは自動的にリンク先のページのデータを読み込み始める
          - ユーザーがクリックした時点で、すでにデータが読み込まれているため、即座にページ遷移が可能
          - バックグラウンドで行われるため、ユーザーの操作に影響を与えない
        - SEOに優しい
        - ブラウザの履歴に残る
        - シンプルな遷移に最適
      */}
      <div>
        <Link href="/mypage">Go to My Page by Link Component</Link>
      </div>
      {/* 
        RoutingButton:
        - プログラムによる遷移（useRouter）
        - プリフェッチなし
        - 条件分岐やデータ取得後の遷移に適している
        - より柔軟な遷移制御が可能
      */}
      <div>
        <RoutingButton path="/store/123" />
      </div>
    </div>
  )
}
