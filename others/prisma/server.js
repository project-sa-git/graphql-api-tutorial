/**
 * Prismaクライアントとexpressをインポート
 * - @prisma/client: データベース操作のためのクライアント
 * - express: Webサーバーフレームワーク
 */
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const PORT = 8000;

/**
 * Prismaクライアントのインスタンスを作成
 * これを通じてデータベース操作を行う
 */
const prisma = new PrismaClient();

/**
 * ミドルウェアの設定
 * - express.json(): POSTリクエストのボディをJSONとしてパース
 */
app.use(express.json());

/**
 * GET /endpoint - すべての投稿を取得
 * @returns {Array} 投稿の配列
 */
app.get("/", async (req, res) => {
  const posts = await prisma.posts.findMany();
  return res.json(posts);
});

/**
 * GET /endpoint/:id - 特定の投稿を取得
 * @param {string} id - 投稿のID
 * @returns {Object} 投稿データ
 * @returns {404} 投稿が見つからない場合
 */
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.posts.findUnique({
    where: { id: Number(id) },
  });
  if (!post) {
    return res.status(404).json({ error: "投稿が見つかりません" });
  }
  return res.json(post);
});

/**
 * POST /endpoint - 新しい投稿を作成
 * @param {Object} req.body - リクエストボディ
 * @param {string} req.body.title - 投稿のタイトル
 * @param {string} req.body.body - 投稿の本文
 * @returns {Object} 作成された投稿データ
 * @returns {500} 作成に失敗した場合
 */
app.post("/", async (req, res) => {
  // リクエストボディからtitleとbodyを取得
  const { title, body } = req.body;

  try {
    // Prismaを使用してデータベースに新しい投稿を作成
    const posts = await prisma.posts.create({
      data: {
        title: title, // 投稿のタイトル
        body: body, // 投稿の本文
      },
    });

    // 作成された投稿をJSONとして返す
    return res.json(posts);
  } catch (error) {
    // エラーハンドリング
    return res.status(500).json({ error: "投稿の作成に失敗しました" });
  }
});

/**
 * PUT /endpoint/:id - 特定の投稿を更新
 * @param {string} id - 投稿のID
 * @param {Object} req.body - リクエストボディ
 * @param {string} req.body.body - 更新する本文
 * @returns {Object} 更新された投稿データ
 */
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  const updatedPost = await prisma.posts.update({
    where: { id: Number(id) },
    data: { body: body },
  });

  return res.json(updatedPost);
});

/**
 * DELETE /endpoint/:id - 特定の投稿を削除
 * @param {string} id - 投稿のID
 * @returns {Object} 削除完了メッセージ
 */
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.posts.delete({
    where: { id: Number(id) },
  });
  return res.json({ message: "投稿が削除されました" });
});

/**
 * サーバーの起動
 * @param {number} PORT - 使用するポート番号
 */
app.listen(PORT, () => {
  console.log(`Prisma サーバーが起動中・・・${PORT}番ポート`);
});
