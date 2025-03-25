'use client'

import { useState } from 'react'
import { Cart } from 'core/domain/entity/cart'
import styles from './CartItemForm.module.scss'

/**
 * カート内容を表示・編集するクライアントコンポーネント
 *
 * クライアントコンポーネントの特徴：
 * 1. ブラウザで実行される
 * 2. インタラクティブな機能を実装可能（状態管理、イベントハンドリング）
 * 3. useStateなどのReactフックが使用可能
 *
 * データの流れ：
 * 1. サーバーコンポーネント（page.tsx）からcartデータを受け取る
 * 2. 受け取ったデータをuseStateで状態として管理
 * 3. ユーザーの操作に応じて状態を更新
 */

type Props = {
  cart: Cart // サーバーコンポーネントから渡されるカートデータ
}

export default function CartItemForm({ cart }: Props) {
  // カートアイテムの状態管理
  // 初期値としてサーバーから受け取ったcart.itemsを使用
  const [items, setItems] = useState<Cart['items']>(cart.items)

  // 数量を増やすハンドラー（クライアントサイドで実行）
  const handleIncrement = (id: number) => {
    setItems((prevState) =>
      prevState.map((item) => {
        return item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      }),
    )
  }

  // 数量を減らすハンドラー（クライアントサイドで実行）
  const handleDecrement = (id: number) => {
    setItems((prevState) =>
      prevState.map((item) => {
        return item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      }),
    )
  }

  return (
    <form className={styles.form}>
      <ul>
        {/* 
          状態として管理しているitemsをマップして表示
          ボタンクリックで状態が更新され、自動的に再レンダリング
        */}
        {items.map((item) => (
          <li key={item.id} className={styles.cartItem}>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.quantity}>{item.quantity}個</span>
            <button
              className={styles.button}
              onClick={() => handleIncrement(item.id)}
              type="button"
            >
              +
            </button>
            <button
              className={styles.button}
              disabled={item.quantity === 0}
              onClick={() => handleDecrement(item.id)}
              type="button"
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </form>
  )
}
