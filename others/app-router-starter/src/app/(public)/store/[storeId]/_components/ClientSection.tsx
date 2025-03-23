'use client'

import { useParams, useSearchParams } from 'next/navigation'

/**
 * クライアントコンポーネント
 *
 * 呼び出しの流れ：
 * 1. ユーザーが /store/[storeId] にアクセス
 *    (例: /store/123?category=tech)
 *
 * 2. Next.jsのルーティングシステムが
 *    src/app/(public)/store/[storeId]/page.tsx を呼び出し
 *
 * 3. page.tsx内でこのClientSectionコンポーネントをレンダリング
 *
 * 4. このコンポーネントはクライアントサイドで実行され、
 *    useParams()とuseSearchParams()を使用して
 *    URLパラメータとクエリパラメータを取得
 *
 * 5. 必要に応じて、fetcher.tsのgetStore()関数を呼び出し
 *    → src/app/(public)/store/[storeId]/fetcher.ts
 *
 * 6. fetcher.tsはAPIエンドポイントを呼び出し
 *    → src/app/api/store/[storeId]/route.ts
 *
 * 7. route.tsのGETハンドラーが実行され、
 *    データを取得してレスポンスを返す
 *
 * 8. 取得したデータを表示
 */

export default function ClientSection() {
  // URLパラメータからstoreIdを取得
  const params = useParams()
  // クエリパラメータからcategoryを取得
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  return (
    <section>
      <h2>クライアントコンポーネントのセクション</h2>
      <p>Store ID: {params.storeId}</p>
      <p>Store Category: {category}</p>
    </section>
  )
}
