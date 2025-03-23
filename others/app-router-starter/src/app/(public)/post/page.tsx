import { Metadata } from 'next'
import { Suspense } from 'react'
import Skeleton from 'components/Skeleton'
import CategoryTag from './_components/CategoryTag'
import PostCardContainer from './_components/PostCardContainer'
import { listCategory } from './fetcher'
import styles from './Post.module.scss'

/**
 * 投稿一覧ページのサーバーコンポーネント
 *
 * Streaming（ストリーミング）とSuspenseについて：
 *
 * 1. Streamingとは：
 *    - ページ全体が準備できるまで待つのではなく、
 *    - 準備できた部分から順次ユーザーに表示する仕組み
 *    - Netflixのように、コンテンツを少しずつ配信するイメージ
 *
 * 2. Suspenseの役割：
 *    - データ取得中の「待ち状態」を管理
 *    - データがロードされるまでの間、fallbackを表示
 *    - データが準備できたら、自動的に本来のコンテンツを表示
 *
 * 3. この実装での動作フロー：
 *    a. ユーザーがページにアクセス
 *    b. Suspenseがレンダリングを開始
 *    c. PostCardContainerがデータをフェッチ中の間：
 *       - fallbackとして指定されたSkeletonを表示
 *       - [...Array(2)].map で2つのスケルトンを生成
 *    d. データのフェッチが完了したら：
 *       - Skeletonが消える
 *       - 実際の投稿カードが表示される
 *
 * 4. メリット：
 *    - ユーザーの体感的な読み込み時間が短縮
 *    - ページの一部が利用可能になったら即座に表示
 *    - ローディング中でもUIがフリーズしない
 */

export const metadata: Metadata = {
  title: '投稿ページ',
}

// URLのクエリパラメータの型定義
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

/**
 * searchParamsについて：
 * 自動的な受け渡し
 *    - Next.jsが自動的にページコンポーネントに渡すプロパティ
 *    - URLのクエリパラメータ（?以降の部分）を含む
 *
 * URLが: /post?categoryId=1&sort=newest の場合
 *  const { categoryId, sort } = await searchParams
 *  categoryId === "1"
 *  sort === "newest"
 */
export default async function Page({ searchParams }: Props) {
  // const { categoryId, sort } = await searchParams
  // クエリパラメータからカテゴリIDを取得
  const { categoryId } = await searchParams
  // カテゴリ一覧を取得（この処理は即座に実行される）
  const categories = await listCategory()
  // カテゴリIDを文字列として正規化
  const cid = typeof categoryId === 'string' ? categoryId : ''

  return (
    <div>
      <h1>Post Page</h1>
      {/* カテゴリ一覧セクション */}
      <h2>Categories</h2>
      <ul className={styles.categoryList}>
        {/* カテゴリタグをマッピング（この部分は即座に表示される） */}
        {categories.map((category) => {
          return (
            <CategoryTag
              category={category}
              key={category.id}
              isActive={category.id === Number(cid)}
            />
          )
        })}
      </ul>
      {/* 投稿一覧セクション */}
      <h2>Posts</h2>
      <div className={styles.postList}>
        {/* 
          Suspenseによるストリーミング実装
          - keyプロパティにcidを指定することで、カテゴリが変更されるたびに
            Suspenseの中身を再レンダリング
          - fallbackには複数のスケルトンを表示
          - PostCardContainerのデータ取得が完了するまでfallbackを表示
        */}
        <Suspense
          key={cid}
          // Array(2)で長さ2の配列を生成し、スプレッド演算子(...)で展開
          // map関数で各要素をSkeletonコンポーネントに変換
          // index引数はmapのインデックスで、key propとして使用
          fallback={[...Array(2)].map((_, index) => (
            <Skeleton key={index} height={80} />
          ))}
        >
          <PostCardContainer categoryId={cid} />
        </Suspense>
      </div>
    </div>
  )
}
