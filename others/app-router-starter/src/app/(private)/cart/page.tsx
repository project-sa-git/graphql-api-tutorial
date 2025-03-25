import { Metadata } from 'next'
import CartItemForm from './_components/CartItemForm'
import { getCart } from './fetcher'

/**
 * カートページのサーバーコンポーネント
 *
 * サーバーコンポーネントの特徴：
 * 1. サーバーサイドで実行される（ブラウザではなく）
 * 2. データフェッチが直接可能
 * 3. クライアントに送信されるJavaScriptを削減
 *
 * 処理の流れ：
 * 1. ユーザーが /cart にアクセス
 * 2. このコンポーネントがサーバーサイドで実行
 * 3. getCart()でカートデータを取得（await）
 * 4. データを取得後、CartItemFormに渡してレンダリング
 */

export const metadata: Metadata = {
  title: 'カート',
}

export default async function Page() {
  // サーバーサイドでカートデータを取得
  // この処理はブラウザではなくサーバーで実行される
  const cart = await getCart()

  return (
    <div>
      <h1>This is your cart!</h1>
      {/* 
        取得したカートデータをクライアントコンポーネントに渡す
        この時点でデータは既に準備できている（awaitが完了している）
      */}
      <CartItemForm cart={cart} />
    </div>
  )
}
