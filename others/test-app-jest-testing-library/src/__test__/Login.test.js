import { render, screen } from "@testing-library/react";
import Login, { validateEmail } from "../Login";
import userEvent from "@testing-library/user-event";

/**
 * Loginコンポーネントのテストファイル
 *
 * このファイルでは、Loginコンポーネントの各機能をテストします。
 * テスト内容：
 * - フォームの表示確認
 * - メールアドレスのバリデーション
 * - パスワードフィールドの属性
 * - フォーム送信の動作
 */
describe("Loginコンポーネントのテスト", () => {
  /**
   * フォームの基本表示テスト
   * 期待される結果：送信ボタンが1つ存在すること
   */
  test("フォームにボタンが1つ表示(render)されることを確認", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });

  /**
   * メールアドレスの不正形式テスト
   * 期待される結果：@がない形式は無効と判定されること
   */
  test("メールアドレスのバリデーションが失敗することを確認", () => {
    const testEmail = "test.com"; // 不正な形式のメールアドレス
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  /**
   * メールアドレスの正常形式テスト
   * 期待される結果：正しい形式は有効と判定されること
   */
  test("メールアドレスのバリデーションが成功することを確認", () => {
    const testEmail = "test@example.com"; // 正しい形式のメールアドレス
    expect(validateEmail(testEmail)).toBe(true);
  });

  /**
   * パスワードフィールドのセキュリティテスト
   * 期待される結果：入力値が非表示になるよう type="password" が設定されていること
   */
  test("パスワード入力フィールドのtypeがpasswordであることを確認", () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText("パスワード入力");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  /**
   * フォーム送信の統合テスト
   * テスト手順：
   * 1. メールアドレスとパスワードを入力
   * 2. 送信ボタンをクリック
   * 3. 正しいメールアドレスが表示されることを確認
   */
  test("フォームの送信が成功することを確認", () => {
    // コンポーネントのレンダリング
    render(<Login />);

    // 必要な要素の取得
    const submitButton = screen.getByTestId("submit");
    const emailInput = screen.getByPlaceholderText("メールアドレス入力");
    const passwordInput = screen.getByPlaceholderText("パスワード入力");

    // ユーザーの入力をシミュレート
    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");
    userEvent.click(submitButton);

    // 送信後の表示を確認
    const userInfo = screen.getByText("test@example.com");
    expect(userInfo).toBeInTheDocument();
  });
});
