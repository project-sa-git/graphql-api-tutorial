import { Author } from 'core/domain/entity/author'
import { Post } from 'core/domain/entity/post'

/**
 * カテゴリー別の投稿一覧を取得するフェッチャー関数
 *
 * ダイナミックルーティングとクエリパラメータについて：
 * - URLパターン: /api/post?categoryId=xxx
 * - categoryIdが指定された場合のみ、そのカテゴリーの投稿をフィルタリング
 * - categoryIdが指定されない場合は全投稿を取得
 *
 * キャッシュ戦略について：
 * cache: 'no-store' を使用する理由：
 * - 投稿データは頻繁に更新される可能性がある
 * - 常に最新のデータを表示する必要がある
 * - キャッシュを使用せず、毎回サーバーから新しいデータを取得
 *
 * @param categoryId - フィルタリングするカテゴリーID（オプション）
 * @returns Promise<Post[]> - 投稿の配列
 */
export async function listPostByCategory(categoryId: string): Promise<Post[]> {
  // URLSearchParamsを使用してクエリパラメータを構築
  const params = new URLSearchParams()
  if (categoryId) {
    params.append('categoryId', categoryId)
  }

  // APIエンドポイントにリクエストを送信
  const res = await fetch(`http://localhost:3000/api/post?${params.toString()}`, {
    cache: 'no-store', // キャッシュを使用しない
  })

  // レスポンスをJSONとしてパース
  const data = await res.json()

  // エラーハンドリング
  if (res.status !== 200) {
    throw new Error(data.message)
  }

  return data.posts
}

export async function listAuthor(): Promise<Author[]> {
  const res = await fetch(`http://localhost:3000/api/author`, {
    cache: 'force-cache',
  })
  const data = await res.json()
  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data.authors
}
