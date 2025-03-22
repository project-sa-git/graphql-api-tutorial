/**
 * Client Component - エラーハンドリングコンポーネント
 *
 * このコンポーネントが'use client'である理由：
 * 1. useRouterフック(カスタムフック)を使用するため
 *    - useRouterはクライアントサイドでのみ動作するフック
 * 2. インタラクティブな要素（ボタンのクリックハンドラ）を使用するため
 * 3. エラーが発生した後のユーザーとのインタラクションを処理するため
 *
 * 500エラー（サーバーエラー）に限らず、アプリケーション内で発生した
 * あらゆるエラーをキャッチして表示するグローバルエラーハンドラーとして機能します。
 */
'use client'

import { useRouter } from 'next/navigation'

export default function Error({ error }: { error: Error }) {
  // クライアントサイドでのルーティング用のフック
  const router = useRouter()

  // ユーザーの操作（クリック）に応じてホームページに遷移
  const handleBackToHome = () => router.push('/')

  return (
    <div>
      <p>{error.message}</p>
      <button onClick={handleBackToHome}>トップページへ戻る</button>
    </div>
  )
}
