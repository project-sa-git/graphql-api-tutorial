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

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
  const { categoryId } = await searchParams
  const categories = await listCategory()
  const cid = typeof categoryId === 'string' ? categoryId : ''

  return (
    <div>
      <h1>Post Page</h1>
      <h2>Categories</h2>
      <ul className={styles.categoryList}>
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
      <h2>Posts</h2>
      <div className={styles.postList}>
        <Suspense
          key={cid}
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
