import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css"; // 新しいCSSファイルをインポート

/**
 * ログインフォームコンポーネント
 *
 * 機能：
 * - メールアドレスとパスワードの入力フォームを提供
 * - メールアドレスのバリデーション（形式チェック）
 * - 入力されたメールアドレスの表示（正常時）
 * - エラーメッセージの表示（不正時）
 *
 * 使用ライブラリ：
 * - React: フロントエンド開発フレームワーク
 * - React Bootstrap: UIコンポーネントライブラリ
 *
 * 状態管理：
 * - email: メールアドレス入力値
 * - password: パスワード入力値
 * - error: エラーメッセージ
 * - showUser: ユーザー情報表示フラグ
 */
const Login = () => {
  // 各種状態（state）の定義
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showUser, setShowUser] = useState(false);

  /**
   * フォーム送信時の処理
   * @param {Event} e - フォーム送信イベント
   * @returns {boolean} - バリデーション結果
   */
  const handleSubmit = (e) => {
    setShowUser(false);
    e.preventDefault();
    if (validateEmail(email)) {
      setShowUser(true);
      setError("");
      return;
    }
    setError("メールアドレスが有効ではありません");
    return false;
  };

  // JSX部分：フォームの構造を定義
  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit} noValidate className="login-form">
        {/* メールアドレス入力フィールド */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-light">メールアドレス</Form.Label>
          <Form.Control
            type="email"
            placeholder="メールアドレス入力"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="dark-input"
          />
        </Form.Group>

        {/* パスワード入力フィールド */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-light">パスワード</Form.Label>
          <Form.Control
            type="password"
            placeholder="パスワード入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dark-input"
          />
        </Form.Group>

        {/* 正常時のユーザー情報表示 */}
        {showUser && (
          <Alert data-testid="user" variant="success" className="dark-alert">
            {email}
          </Alert>
        )}
        {/* エラーメッセージ表示 */}
        {error && (
          <Alert data-testid="error" variant="danger" className="dark-alert">
            {error}
          </Alert>
        )}

        {/* 送信ボタン */}
        <Button
          data-testid="submit"
          variant="primary"
          type="submit"
          className="dark-button"
        >
          送信
        </Button>
      </Form>
    </div>
  );
};

/**
 * メールアドレスのバリデーション関数
 * @param {string} email - 検証するメールアドレス
 * @returns {boolean} - 検証結果（true: 有効, false: 無効）
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (regex.test(email)) {
    return true;
  }
  return false;
};

export default Login;
