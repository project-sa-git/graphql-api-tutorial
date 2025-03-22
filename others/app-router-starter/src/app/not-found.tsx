/**
 * Server Component - 404エラーページコンポーネント
 *
 * このコンポーネントがServer Componentである理由：
 * 1. インタラクティブな要素が最小限（単純なリンク）
 * 2. SEOの最適化が重要
 *    - 404ステータスコードをサーバーサイドで適切に返却
 *    - 検索エンジンのクローラーが404ページを正しく認識できる
 *    - カスタム404ページの内容を検索エンジンにインデックス
 *    - ユーザーを適切なページに誘導するリンクを提供
 *    - クローラーがサイトの構造を理解しやすい
 * 3. パフォーマンスの最適化（JavaScriptバンドルサイズを最小限に）
 *
 * Linkコンポーネントは、Server ComponentsでもClient Componentsでも
 * 使用可能な特別なコンポーネントです。
 */
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <p>お探しのページが見つかりません。</p>
      {/* 
        Linkコンポーネントを使用：
        - プリフェッチ機能により高速な遷移
        - SEOフレンドリー
        - JavaScriptが無効でも機能
      */}
      <Link href="/">
        <button>トップページへ戻る</button>
      </Link>
    </div>
  )
}
