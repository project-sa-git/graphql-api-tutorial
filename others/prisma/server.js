const express = require("express");
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Prisma サーバーが起動中・・・${PORT}番ポート`);
});
