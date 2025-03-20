/**
 * AppOriginコンポーネントのテストファイル
 *
 * このファイルでは、AppOriginコンポーネントの基本的な機能をテストします。
 * Jest と React Testing Library を使用してテストを実行します。
 */

import { render, screen } from "@testing-library/react";
import AppOrigin from "./AppOrigin";

/**
 * Reactのリンクが正しく表示されるかテスト
 *
 * テスト内容：
 * 1. AppOriginコンポーネント(AppOrigin.js)をレンダリング
 * 2. 「learn react」というテキストを含むリンクの存在を確認
 *
 * 期待される結果：
 * - 画面上に「learn react」というテキストを含むリンクが表示されている
 */
test("「learn react」のリンクが表示されることを確認", () => {
  // AppOriginコンポーネントをレンダリング
  render(<AppOrigin />);

  // リンクの要素を取得
  const linkElement = screen.getByText(/learn reactaa/i);

  // リンクが存在することを確認
  expect(linkElement).toBeInTheDocument();
});
