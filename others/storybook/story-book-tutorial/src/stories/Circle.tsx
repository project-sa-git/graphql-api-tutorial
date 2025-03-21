import React from "react";

// コンポーネントのプロパティ定義
type Props = {
  /**
   * プロジェクトで使用する円のUIコンポーネントです。
   */
  variant: "orange" | "green" | "yellow"; // 円の色バリエーション
};

/**
 * 指定された色の円を描画するコンポーネント
 */
const Circle = ({ variant }: Props) => {
  let bgcolor;

  // variantに応じてTailwindの背景色クラスを設定
  switch (variant) {
    case "orange":
      bgcolor = "bg-orange-500";
      break;
    case "green":
      bgcolor = "bg-green-500";
      break;
    case "yellow":
      bgcolor = "bg-yellow-500";
      break;
  }

  // 円を描画（Tailwindクラスで円形・サイズ・色を設定）
  return <div className={`${bgcolor} w-14 h-14 p-2 rounded-full`}></div>;
};

export default Circle;
