import { Meta, StoryObj } from "@storybook/react";
import Circle from "./Circle";

// Circleコンポーネントのストーリー設定
const meta: Meta<typeof Circle> = {
  component: Circle,
  title: "Example/Circle",
  // バリアントの選択肢を定義
  argTypes: {
    variant: {
      control: { type: "select" }, // セレクトボックスでの選択を可能に
      options: ["orange", "green", "yellow"], // 選択可能な色のオプション
    },
  },
  tags: ["autodocs"], // 自動ドキュメント生成を有効化
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * デフォルトの円コンポーネント。
 * オレンジ色のバリアントを使用した基本的な表示例です。
 */
export const BaseCircle: Story = {
  args: {
    variant: "orange",
  },
};

/**
 * 緑色バリアントの円コンポーネント。
 * 成功や許可を表現する際に使用できます。
 */
export const GreenCircle: Story = {
  args: {
    variant: "green",
  },
};

/**
 * 黄色バリアントの円コンポーネント。
 * 警告や注意を表現する際に使用できます。
 */
export const YellowCircle: Story = {
  args: {
    variant: "yellow",
  },
};

/**
 * 全てのバリアントを並べて表示するサンプル。
 * 利用可能な全ての色バリエーションを一度に確認できます。
 */
export const GroupedCircles: Story = {
  render: () => (
    <div style={{ padding: 10 }}>
      <Circle variant="orange" />
      <Circle variant="green" />
      <Circle variant="yellow" />
    </div>
  ),
};
