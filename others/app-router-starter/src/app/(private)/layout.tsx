// layout.tsxの例（Serverコンポーネント）
import { ReactNode } from 'react'
import Sidebar from 'components/Sidebar'
import CartMenu from 'components/Sidebar/_components/CartMenu'
import styles from './layout.module.scss'
import { redirect } from 'next/navigation'

/**
 * プライベートページ用のレイアウトコンポーネント
 *
 * childrenとReactNodeについて：
 *
 * 1. childrenとは：
 *    - コンポーネントの「子要素」を表す特別なプロパティ
 *    - コンポーネントのタグの間に書かれた内容が入る
 *
 * 2. ReactNodeとは：
 *    - Reactで扱える全ての要素の型
 *    - 以下のようなものが含まれる：
 *      - JSX要素（<div>, <p>など）
 *      - 文字列や数値
 *      - 他のReactコンポーネント
 *      - null, undefined
 *      - 配列（上記の組み合わせ）
 *
 * 3. このレイアウトでのchildrenの具体例：
 *    (private)ディレクトリ配下の各ページコンポーネントが入る
 *    - /cart のとき → Cartページのコンポーネントがchildrenに
 *    - /mypage のとき → Mypageコンポーネントがchildrenに
 *
 * 使用例：
 * <PrivateLayout>
 *   <CartPage />  // これがchildrenとして渡される
 * </PrivateLayout>
 *
 * または：
 * <PrivateLayout>
 *   <MyPage />    // これがchildrenとして渡される
 * </PrivateLayout>
 */
export default function PrivateLayout({ children }: { children: ReactNode }) {
  // サーバーサイドで認証チェック
  // 例えばここでクッキーからセッショントークンを取得して認証済かどうか確認する
  // const isAuthorized = await getAuth()

  // http://localhost:3000/cart
  // など確認で開きたい場合、以下の様に手動でtrue
  const isAuthorized = true

  if (!isAuthorized) {
    // 認証されていない場合はサーバーサイドでリダイレクト
    redirect('/')
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>Private Page Header</div>
      </header>
      <main className={styles.main}>
        {/* 
          ここでchildrenを表示
          - /cart にアクセスした場合 → CartPageコンポーネントが表示
          - /mypage にアクセスした場合 → MyPageコンポーネントが表示
        */}
        <div className={styles.privatePage}>{children}</div>
        {/* クライアントコンポーネントの内側にサーバーコンポーネントが配置されるCompositionパターン */}
        {/* 
          Sidebar（クライアントコンポーネント）
          - インタラクティブな要素を含むUIのため、クライアントコンポーネントとして実装
          - 内部でさらにchildrenを受け取る
        */}
        {/* 
            CartMenu（サーバーコンポーネント）
            - データフェッチやビジネスロジックを含むため、サーバーコンポーネントとして実装
            - Sidebarのchildrenとして渡される
          */}
        <Sidebar>
          <CartMenu />
        </Sidebar>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>Private Page Footer</div>
      </footer>
    </>
  )
}
