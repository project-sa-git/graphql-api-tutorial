'use client'

import classNames from 'classnames'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import styles from './Sidebar.module.scss'

/**
 * サイドバーコンポーネント（クライアントコンポーネント）
 *
 * インタラクティブな要素：
 * 1. サイドバーの開閉状態の管理（useState）
 * 2. クリックによる開閉の切り替え
 * 3. 状態に応じたスタイルの動的な変更
 * 4. 状態に応じた画像の切り替え
 *
 * Propsの説明：
 * @param children - サイドバーの中身として表示するコンポーネント
 *                  例：<CartMenu />などのコンポーネントが入る
 *
 * 状態管理：
 * - isOpen: サイドバーが開いているかどうかのブール値
 * - setIsOpen: 状態を更新する関数
 */
type Props = {
  children: ReactNode // ReactNodeは、JSX要素、文字列、数値、null、undefined等を受け入れる型
}

export default function Sidebar({ children }: Props) {
  // サイドバーの開閉状態を管理するstate
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // サイドバーの開閉を切り替えるハンドラー関数
  // prevStateを使用することで、複数の更新が安全に行える
  const handleToggleSidebar = () => setIsOpen((prevState) => !prevState)

  return (
    <aside
      // classNamesを使用して、動的にクラスを切り替え
      // isOpenがtrueの時、styles.openクラスが追加される
      className={classNames(styles.sidebar, { [styles.open]: isOpen })}
    >
      {/* childrenを表示（CartMenuなどのコンポーネント） */}
      {children}

      {/* サイドバーを開閉するボタン */}
      <button className={styles.toggleButton} onClick={handleToggleSidebar}>
        <Image
          // isOpenの状態に応じて異なる矢印アイコンを表示
          src={isOpen ? '/icon/arrow_right.svg' : '/icon/arrow_left.svg'}
          alt="サイドバーの開閉"
          width={24}
          height={24}
        />
      </button>
    </aside>
  )
}
