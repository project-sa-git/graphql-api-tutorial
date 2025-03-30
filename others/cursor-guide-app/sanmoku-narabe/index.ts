import * as readline from "readline";

// ゲームボードの型定義
type Cell = "X" | "O" | " ";
type Board = Cell[][];

// ゲームの状態管理クラス
class TicTacToe {
  private board: Board;
  private currentPlayer: "X" | "O";
  private rl: readline.Interface;

  constructor() {
    // 3x3の空のボードを初期化
    this.board = Array(3)
      .fill(null)
      .map(() => Array(3).fill(" "));
    this.currentPlayer = "X";
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  // ボードの表示
  private displayBoard(): void {
    console.clear();
    console.log("  0 1 2");
    this.board.forEach((row, i) => {
      console.log(`${i} ${row.join("|")}`);
      if (i < 2) console.log("  -----");
    });
  }

  // 勝利判定
  private checkWin(): boolean {
    // 横のチェック
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] !== " " &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]
      ) {
        return true;
      }
    }

    // 縦のチェック
    for (let j = 0; j < 3; j++) {
      if (
        this.board[0][j] !== " " &&
        this.board[0][j] === this.board[1][j] &&
        this.board[1][j] === this.board[2][j]
      ) {
        return true;
      }
    }

    // 斜めのチェック
    if (
      this.board[0][0] !== " " &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      return true;
    }

    if (
      this.board[0][2] !== " " &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      return true;
    }

    return false;
  }

  // 引き分け判定
  private checkDraw(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== " "));
  }

  // プレイヤーの入力を処理
  private async getPlayerMove(): Promise<[number, number]> {
    while (true) {
      const input = await new Promise<string>((resolve) => {
        this.rl.question(
          `プレイヤー${this.currentPlayer}の番です (行 列): `,
          resolve
        );
      });

      const [row, col] = input.split(" ").map(Number);

      if (
        row >= 0 &&
        row < 3 &&
        col >= 0 &&
        col < 3 &&
        this.board[row][col] === " "
      ) {
        return [row, col];
      }
      console.log(
        "無効な入力です。0-2の範囲で空いているマスを選んでください。"
      );
    }
  }

  // ゲームの実行
  public async play(): Promise<void> {
    while (true) {
      this.displayBoard();
      const [row, col] = await this.getPlayerMove();
      this.board[row][col] = this.currentPlayer;

      if (this.checkWin()) {
        this.displayBoard();
        console.log(`プレイヤー${this.currentPlayer}の勝利！`);
        break;
      }

      if (this.checkDraw()) {
        this.displayBoard();
        console.log("引き分けです！");
        break;
      }

      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }

    this.rl.close();
  }
}

// ゲームの開始
const game = new TicTacToe();
game.play();
