/**
 * このファイルはサーバーコンポーネントの一部です。
 * Next.jsのApp Routerでは、app/apiディレクトリ配下のファイルは
 * すべてサーバーサイドで実行されるAPI Routeとして扱われます。
 *
 * クライアントコンポーネントからはfetchを使用して呼び出され、
 * サーバーサイドで処理が実行されます。
 */

import { NextRequest, NextResponse } from 'next/server'
import { Store } from 'core/domain/entity/store'
import { sleep } from '../../utils'

/**
 * GETリクエストを処理するルートハンドラー
 *  - ハンドラーとは「リクエストとレスポンスの橋渡し役」
 * ハンドラー（Handler）とは：
 * - 「リクエストとレスポンスの橋渡し役」
 * - 特定のイベントやリクエストを「処理する」関数のこと
 * - イベントやリクエストを「取り扱う人（handler）」というイメージ
 *
 * 例えば：
 * - GETハンドラー → GETリクエストを処理する担当者
 * - PUTハンドラー → PUTリクエストを処理する担当者
 *
 *
 * このファイルは /api/store/[storeId] というURLパターンにマッチし、
 * [storeId]の部分は動的なパラメータとして扱われます
 *
 * 呼び出し方の例：
 * // 別のコンポーネントやページから以下のように呼び出されます
 * fetch('/api/store/123')  // GETメソッドで呼び出し
 * // または
 * fetch('/api/store/123', { method: 'GET' })  // 明示的にGETを指定
 *
 * fetchのデフォルトメソッドはGETなので、methodを指定しない場合は
 * 自動的にGETリクエストとして扱われます。
 *
 * @param request - HTTPリクエストオブジェクト
 * @param params - URLパラメータを含むオブジェクト（この場合はstoreId）
 * @returns NextResponse - APIレスポンス
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ storeId: string }> },
) {
  try {
    // URLパラメータからstoreIdを取得
    const { storeId } = await params

    // 実際のアプリケーションでは、ここでデータベースから店舗情報を取得します
    // この例では擬似的な遅延を発生させています
    await sleep(1000)

    // モックデータとして店舗情報を作成
    const store: Store = {
      address: '東京都千代田区1-1-1',
      category: 'tech',
      id: storeId,
      name: 'toraco',
    }

    // これはサーバーコンポーネントなので、ブラウザでなくターミナルでしか見れない
    console.log(store)

    // 成功時のレスポンスを返す
    return NextResponse.json({ message: '店舗情報を取得しました。', store }, { status: 200 })
  } catch (error) {
    // エラーが発生した場合の処理
    console.error(error)
    return NextResponse.json(
      {
        message: '店舗情報の取得に失敗しました。',
        store: null,
      },
      { status: 500 },
    )
  }
}

/**
 * PUTリクエストを処理するルートハンドラー
 *
 * 店舗情報を更新するためのエンドポイント
 *
 * 呼び出し方の例：
 * // 別のコンポーネントやページから以下のように呼び出されます
 * fetch('/api/store/123', {
 *   method: 'PUT',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     name: '新しい店舗名',
 *     address: '新しい住所',
 *     category: '新しいカテゴリ'
 *   })
 * })
 *
 * @param request - HTTPリクエストオブジェクト（リクエストボディに更新データを含む）
 * @param params - URLパラメータを含むオブジェクト（この場合はstoreId）
 * @returns NextResponse - APIレスポンス
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ storeId: string }> },
) {
  try {
    const { storeId } = await params
    // リクエストボディから更新データを取得
    const updateData = await request.json()

    // 実際のアプリケーションでは、ここでデータベースの更新処理を行う
    await sleep(1000)

    // モックデータとして更新後の店舗情報を作成
    const updatedStore: Store = {
      id: storeId,
      name: updateData.name || 'toraco',
      address: updateData.address || '東京都千代田区1-1-1',
      category: updateData.category || 'tech',
    }

    return NextResponse.json(
      { message: '店舗情報を更新しました。', store: updatedStore },
      { status: 200 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: '店舗情報の更新に失敗しました。',
        store: null,
      },
      { status: 500 },
    )
  }
}
