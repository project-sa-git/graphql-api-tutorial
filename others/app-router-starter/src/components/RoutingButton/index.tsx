/**
 * Client Component
 *
 * クライアントサイド（ユーザーのブラウザ上）で実行されるコンポーネント
 * 特徴：
 * - ユーザーの操作（クリックなど）に反応できる
 * - ブラウザの機能（localStorageなど）を使用できる
 * - インタラクティブな機能を実装できる
 *
 * 'use client'ディレクティブにより、このコンポーネントはクライアントサイドでレンダリングされます。
 * useRouterなどのクライアントサイドの機能を使用するために必要です。
 */
'use client'

import { useRouter } from 'next/navigation'
import styles from './RoutingButton.module.scss'

type Props = {
  path: string
}

/**
 * プログラムによるページ遷移を提供するボタンコンポーネント
 *
 * useRouterを使用して、クリック時に指定されたパスへの遷移を行います。
 * Linkコンポーネントと異なり、プリフェッチは行われませんが、
 * より柔軟な遷移制御が可能です。
 *
 * @param path - 遷移先のパス
 */
export default function RoutingButton({ path }: Props) {
  // Next.jsのルーターインスタンスを取得
  const router = useRouter()

  return (
    // クライアントサイドでクリック時に指定されたパスへ遷移
    <button className={styles.button} onClick={() => router.push(path)}>
      Routing to {path}
    </button>
  )
}
