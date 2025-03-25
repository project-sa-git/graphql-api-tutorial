import PostCards from '../PostCards'
import { listAuthor, listPostByCategory } from './fetcher'

/**
 * 投稿カードコンテナコンポーネント
 *
 * Promise.allを使用したパラレルデータフェッチングの実装
 *
 * 【データフェッチの流れ】
 * 1. listPostByCategory と listAuthor を同時に実行開始
 * 2. 両方のデータ取得が完了するまで待機
 * 3. 完了後、結果を分割代入で取得
 *
 * 【パフォーマンスの最適化】
 * - 直列実行（Sequential Execution）の場合：
 *   posts取得(3秒) → authors取得(3秒) = 合計6秒
 *
 * - 並列実行（Parallel Execution）の場合（現在の実装）：
 *   posts取得(3秒)
 *   authors取得(3秒)
 *   = 合計3秒に短縮
 *
 * 【直列実行（Sequential）を選ぶべきケース】
 * 1. データの依存関係がある場合：
 *    - 最初のリクエストの結果が次のリクエストに必要
 *    例：ユーザーIDを取得してから、そのユーザーの投稿を取得
 *    ```typescript
 *    const user = await getUser(id)
 *    const posts = await getUserPosts(user.id)
 *    ```
 *
 * 2. エラーハンドリングを細かく制御したい場合：
 *    - 各ステップでのエラー処理が重要な場合
 *    例：認証→データ取得の順で、認証エラーを優先的に処理
 *    ```typescript
 *    const auth = await authenticate()
 *    if (!auth.success) return handleAuthError()
 *    const data = await fetchData()
 *    ```
 *
 * 3. リソースの使用を制御したい場合：
 *    - サーバーへの同時リクエストを制限したい場合
 *    例：大量のデータを順次処理
 *    ```typescript
 *    for (const chunk of dataChunks) {
 *      await processChunk(chunk)
 *    }
 *    ```
 *
 * 【リクエストメモライザーション】
 * Next.jsは同一リクエストを自動的にメモ化：
 * - 1回目：実際にAPIリクエストが発生
 * - 2回目以降：メモ化された結果を再利用
 *
 * 【メモ化（Memoization）の仕組みと種類】
 *
 * 1. リクエストメモ化（Next.js自動最適化）
 *    - 同一リクエストの自動検出と結果の再利用
 *    - レンダリングサイクル内でのキャッシュ
 *    ```typescript
 *    // 1回目：実際のフェッチ
 *    const data1 = await listAuthor()
 *    // 2回目：メモ化された結果を再利用
 *    const data2 = await listAuthor() // 新規リクエストは発生しない
 *    ```
 *
 * 2. コンポーネントメモ化（React.memo）
 *    - propsが変更されない限り再レンダリングを防ぐ
 *    ```typescript
 *    const MemoizedPostCards = memo(PostCards)
 *    // propsが同じ場合、再レンダリングをスキップ
 *    <MemoizedPostCards authors={authors} posts={posts} />
 *    ```
 *
 * 3. 値のメモ化（useMemo）
 *    - 複雑な計算結果のキャッシュ
 *    ```typescript
 *    const processedPosts = useMemo(() =>
 *      posts.map(post => processPost(post)),
 *      [posts] // 依存配列
 *    )
 *    ```
 *
 * 4. 関数のメモ化（useCallback）
 *    - イベントハンドラなどの関数をキャッシュ
 *    ```typescript
 *    const handlePostClick = useCallback((postId) => {
 *      // 処理
 *    }, []) // 依存配列が空の場合、関数は再作成されない
 *    ```
 *
 * 【メモ化の使い分け】
 * - リクエストメモ化：データフェッチの重複防止
 * - React.memo：大きなリストの再レンダリング防止
 * - useMemo：計算コストの高い処理の結果をキャッシュ
 * - useCallback：子コンポーネントへ渡す関数の安定性確保
 *
 * 【注意点】
 * 1. メモ化自体にもコストがある
 *    - 単純な処理には不要
 *    - パフォーマンス計測と比較が重要
 *
 * 2. 依存配列の適切な設定
 *    - 必要なものだけを含める
 *    - 不要な再計算を防ぐ
 *
 * 3. メモ化の限界
 *    - オブジェクトや配列は毎回新しい参照
 *    - プリミティブ値での比較が推奨
 *
 * @param categoryId - フィルタリングするカテゴリーID
 */
export default async function PostCardContainer({ categoryId }: { categoryId: string }) {
  // Promise.allで複数のデータフェッチを並列実行
  const [posts, authors] = await Promise.all([
    listPostByCategory(categoryId), // 投稿データの取得
    listAuthor(), // 著者データの取得
  ])
  return <PostCards authors={authors} posts={posts} />
}
