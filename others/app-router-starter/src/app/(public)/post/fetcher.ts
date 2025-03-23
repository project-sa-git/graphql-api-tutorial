import { Category } from 'core/domain/entity/category'

/**
 * 投稿データを取得するためのフェッチャー関数
 *
 * キャッシュ戦略について：
 * cache: 'force-cache' は以下の動作をします：
 * - デフォルトのキャッシュ戦略（静的フェッチ）
 * - 一度取得したデータをキャッシュとして保存
 * - 同じリクエストが来た場合、キャッシュからデータを返す
 * - ビルド時にデータをプリフェッチ可能
 *
 * キャッシュオプションの種類：
 * 1. 'force-cache' (デフォルト)
 *    - 可能な限りキャッシュを使用
 *    - 静的データに最適
 *
 * 2. 'no-store'
 *    - キャッシュを使用しない
 *    - 常に新しいデータを取得
 *    - リアルタイムデータに最適
 *
 * 3. 'no-cache'
 *    - キャッシュを検証してから使用
 *    - 古いキャッシュは使用しない
 *    - 頻繁に更新されるデータに最適
 *
 * @param id - 取得する投稿のID
 * @returns Promise<Post> - 投稿データ
 */
export async function getPost(id: string) {
  const res = await fetch(`/api/post/${id}`, {
    cache: 'force-cache', // 静的キャッシュを使用
  })
  // ... 以下、レスポンス処理
}

export async function listCategory(): Promise<Category[]> {
  const res = await fetch(`http://localhost:3000/api/category`, {
    cache: 'force-cache',
  })
  const data = await res.json()
  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data.categories
}
