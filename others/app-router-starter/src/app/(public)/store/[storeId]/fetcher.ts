import { Store } from 'core/domain/entity/store'

/**
 * 店舗情報を取得するためのフェッチャー関数
 *
 * この関数は /api/store/[storeId] のGETエンドポイントを呼び出し、
 * 店舗情報を取得します。
 *
 * fetchのデフォルトメソッドはGETなので、methodの指定は省略しています。
 *
 * @param storeId - 取得する店舗のID
 * @returns Promise<Store> - 店舗情報
 * @throws Error - APIリクエストが失敗した場合（ステータスコードが200以外の場合）
 */
export async function getStore(storeId: string) {
  // APIエンドポイントにGETリクエストを送信
  const res = await fetch(`http://localhost:3000/api/store/${storeId}`)
  // レスポンスをJSONとしてパース
  const data = await res.json()
  // エラーハンドリング：ステータスコードが200以外の場合はエラーをスロー
  if (res.status !== 200) {
    throw new Error(data.message)
  }
  // 成功時は店舗情報を返す
  return data.store
}

/**
 * 店舗情報を更新するためのフェッチャー関数
 *
 * この関数は /api/store/[storeId] のPUTエンドポイントを呼び出し、
 * 店舗情報を更新します。
 *
 * @param storeId - 更新する店舗のID
 * @param updateData - 更新する店舗情報（Store型の一部のプロパティ）
 * @returns Promise<Store> - 更新後の店舗情報
 * @throws Error - APIリクエストが失敗した場合（ステータスコードが200以外の場合）
 */
export async function updateStore(storeId: string, updateData: Partial<Store>) {
  // APIエンドポイントにPUTリクエストを送信
  const res = await fetch(`http://localhost:3000/api/store/${storeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })
  // レスポンスをJSONとしてパース
  const data = await res.json()
  // エラーハンドリング：ステータスコードが200以外の場合はエラーをスロー
  if (res.status !== 200) {
    throw new Error(data.message)
  }
  // 成功時は更新後の店舗情報を返す
  return data.store
}
