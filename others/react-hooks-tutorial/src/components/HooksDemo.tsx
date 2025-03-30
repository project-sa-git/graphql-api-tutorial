"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import "./HooksDemo.css";

// データの型定義
interface Post {
  id: number;
  title: string;
  body: string;
}

// React.memoを使用した子コンポーネントを2つ作成
const MemoizedChildWithCallback = React.memo<{ onIncrement: () => void }>(
  ({ onIncrement }) => {
    console.log(
      "Memoized子コンポーネント（useCallback使用）がレンダリングされました"
    );
    return (
      <div className="child-component">
        <h3>useCallback使用の子コンポーネント</h3>
        <button onClick={onIncrement}>カウントを増やす</button>
      </div>
    );
  }
);

const MemoizedChildWithoutCallback = React.memo<{ onIncrement: () => void }>(
  ({ onIncrement }) => {
    console.log(
      "Memoized子コンポーネント（useCallback未使用）がレンダリングされました"
    );
    return (
      <div className="child-component">
        <h3>useCallback未使用の子コンポーネント</h3>
        <button onClick={onIncrement}>カウントを増やす</button>
      </div>
    );
  }
);

// 開発時のデバッグを容易にするために、表示名を設定
MemoizedChildWithCallback.displayName = "MemoizedChildWithCallback";
MemoizedChildWithoutCallback.displayName = "MemoizedChildWithoutCallback";

const HooksDemo: React.FC = () => {
  // useState の例
  const [count, setCount] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  // useRef の例
  // useRefは、コンポーネントの再レンダリング間で値を保持するためのReactフックです。
  // 主に以下の2つの用途があります:

  // 1. DOM要素への直接アクセス
  // inputRefは入力フィールドのDOM要素を参照するために使用します。
  // 例: フォーカスを当てる、スクロール位置の制御、サイズの取得など
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. ミュータブルな値の保持
  // ミュータブルとは「変更可能」という意味です。
  // useRefで保持する値は、再レンダリングを引き起こす（トリガーする）ことなく
  // 直接変更(ミューテーション)することができます。
  // これは、useState とは異なり、値の更新時に再レンダリングが
  // 発生しないため、パフォーマンスの最適化に役立ちます。
  // renderCountはコンポーネントの再レンダリング回数を追跡します。
  // useRefの値を変更してもコンポーネントは再レンダリングされません。
  // これは、単なる状態の保持に便利です。
  const renderCount = useRef<number>(0);

  // もし代わりにuseStateを使うと無限ループが発生します：
  // 1. 入力による再レンダリング
  // 2. useEffectでsetRenderCount呼び出し
  // 3. setRenderCountによる新たな再レンダリング
  // 4. またuseEffectが実行される
  // 5. またsetRenderCount呼び出し
  // ... 無限ループ
  // そのため、再レンダリング回数のカウントにはuseRefが適しています

  // useRef を使用した副作用の例
  // useEffect(() => {
  //   renderCount.current += 1;
  //   console.log(`コンポーネントの再レンダリング回数: ${renderCount.current}`);
  // });

  // useCallbackを使用した関数（メモ化される）
  const handleIncrementWithCallback = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  // 通常の関数（毎回新しい関数が作成される）
  const handleIncrementWithoutCallback = () => {
    setCount((prev) => prev + 1);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  // useRef を使用した副作用の例
  useEffect(() => {
    renderCount.current += 1;
    console.log(`コンポーネントの再レンダリング回数: ${renderCount.current}`);
  });

  // 入力フィールドにフォーカスを当てる関数
  // useCallbackは、コンポーネントの再レンダリング時に関数を再生成することを防ぐためのHookです。
  // これにより、パフォーマンスを最適化することができます。
  //
  // 以下のような場合にuseCallbackを使うと効果的です:
  // 1. 関数を子コンポーネントにpropsとして渡す場合
  // 2. 関数が重い処理を含む場合
  // 3. 関数が依存配列に含まれる他のHookで使用される場合
  //
  // 第1引数: メモ化したい関数
  // メモ化とは、関数やコンポーネントの結果をキャッシュし、同じ入力に対して
  // 不必要な再計算を防ぐ最適化テクニックです。
  // Reactでは、再レンダリングのたびに関数が新しく作成されますが、
  // メモ化することで、依存する値が変更されない限り、
  // 同じ関数インスタンスを再利用できます。
  // 第2引数: 依存配列（この配列の値が変更された時のみ、関数が再生成されます）
  const focusInput = useCallback(() => {
    // inputRef.current?.focus()は、
    // inputRefが参照するDOM要素が存在する場合にfocusメソッドを呼び出します
    // ?. はオプショナルチェーンと呼ばれ、currentがnullの場合にエラーを防ぎます
    inputRef.current?.focus();
  }, []); // 空の依存配列は、この関数が再レンダリング時に再生成されないことを意味します

  // useEffect の例1: マウント時のみ実行（依存配列が空）
  useEffect(() => {
    console.log("コンポーネントがマウントされました");
    fetchPosts();

    // クリーンアップ関数
    return () => {
      console.log("コンポーネントがアンマウントされました");
    };
  }, []);

  // useEffect の例2: 特定の値が変更されたときに実行
  useEffect(() => {
    document.title = `カウント: ${count}`;
  }, [count]);

  // データフェッチの関数
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=3"
      );
      if (!response.ok) throw new Error("データの取得に失敗しました");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "予期せぬエラーが発生しました"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">データを読み込み中...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="hooks-demo">
      <h1>React Hooks デモ</h1>

      {/* useState のデモ */}
      <section className="demo-section">
        <h2>useState デモ</h2>
        <div className="counter">
          <p>カウント: {count}</p>
          <button onClick={handleIncrementWithoutCallback}>増やす</button>
        </div>
        <div className="input-demo">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="テキストを入力"
          />
          <button onClick={focusInput}>入力欄にフォーカス</button>
          <p>入力値: {inputValue}</p>
          <p>再レンダリング回数: {renderCount.current}</p>
        </div>
      </section>

      {/* useCallbackの比較デモ */}
      <section className="demo-section">
        <h2>useCallback比較デモ</h2>
        <p>入力欄に文字を入力して、コンソールの出力を確認してください。</p>
        <p>
          useCallback使用の子コンポーネントは不要な再レンダリングを防ぎます。
        </p>
        <div className="callback-demo">
          <MemoizedChildWithCallback
            onIncrement={handleIncrementWithCallback}
          />
          <MemoizedChildWithoutCallback
            onIncrement={handleIncrementWithoutCallback}
          />
        </div>
        <div className="input-demo">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="テキストを入力して再レンダリングを発生させる"
          />
        </div>
      </section>

      {/* Memoized Child Component のデモ */}
      <section className="demo-section">
        <h2>React.memo デモ</h2>
        <p>
          親コンポーネントの再レンダリングが発生しても、countが変化しない限り子コンポーネントは再レンダリングされません
        </p>
        <MemoizedChildWithoutCallback
          onIncrement={handleIncrementWithoutCallback}
        />
      </section>

      {/* useEffect と fetch のデモ */}
      <section className="demo-section">
        <h2>useEffect と Fetch デモ</h2>
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HooksDemo;
