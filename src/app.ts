import readline from "readline";

let seconds = 15 * 60;
let startTime: number = 0;
let totalMovesX: number = 0;
let totalMovesO: number = 0;
let playerXName: string = "";
let playerOName: string = "";

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function getPlayerName(player: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(`Enter name for Player ${player}: `, (name) => {
      resolve(name);
    });
  });
}

// Create interface for reading input from command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Initialize the Tic Tac Toe board
let board = [
  ["--", "--", "--"],
  ["--", "--", "--"],
  ["--", "--", "--"],
];

// Function to print the current state of the board
export function printBoard(board: string[][]) {
  console.log("************************");
  for (let row = 0; row < 3; row++) {
    // Print each element of the row
    for (let col = 0; col < 3; col++) {
      process.stdout.write(board[row][col] + "  ");
    }
    console.log();
    console.log();
  }
  console.log("*********************");
}

// Function to check if a player has won
export function checkWin(player: string, board: string[][]) {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === player &&
      board[i][1] === player &&
      board[i][2] === player
    )
      return true; // Check rows
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    )
      return true; // Check columns
  }

  // Check diagonals
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  )
    return true; // Check diagonal
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  )
    return true; // Check anti-diagonal

  return false;
}

// Function to check if the board is full (draw)
export function isBoardFull(board: string[][]) {
  for (let row of board) {
    if (row.includes("--")) return false;
  }
  return true;
}

// Function to start the game
export async function startGame() {
  console.log("Welcome to Tic Tac Toe Game!");
  console.log("Game Will Be Timedout in 5 Minutes Automatically");
  console.log(`Type end or exit to abort the game anytime`);
  console.log(`Basic Analytics will be presented after each Input`);
  console.log(
    'Enter your moves by typing the row and column numbers with spacing (e.g., "0 1").'
  );
  console.log();

  playerXName = await getPlayerName("X");
  playerOName = await getPlayerName("O");
  console.log(
    `Let's start the game between ${playerXName} and ${playerOName}!`
  );

  // Initialize variables for players
  startTime = Date.now();
  let currentPlayer = "X";
  let winner = null;

  // Function to handle player input
  function handleInput(input: string) {
    const [row, col] = input.split(" ").map((num) => parseInt(num));

    //Handling graveful exit
    if (input === "exit" || input === "end") {
      console.log("------------------");
      console.log(`Game Aborted By Player ${currentPlayer}`);
      console.log("------------------");

      printGameStatistics();
      clearInterval(timer);
      rl.close();
      return;
    }

    if (row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] !== "--") {
      console.log("------------------");
      console.log("Invalid move! Please try again.");
      console.log("------------------");
      return;
    }

    board[row][col] = currentPlayer;
    if (currentPlayer === "X") {
      totalMovesX++;
    } else {
      totalMovesO++;
    }
    printBoard(board);
    printGameStatistics();

    // Check if current player has won
    if (checkWin(currentPlayer, board)) {
      winner = currentPlayer;
      console.log("------------------");
      console.log(`Player ${currentPlayer} wins!`);
      console.log("------------------");
      printGameStatistics();
      clearInterval(timer);
      rl.close();
      return;
    }

    // Check for draw
    if (isBoardFull(board)) {
      console.log("------------------");
      console.log("It's a draw!");
      console.log("------------------");
      printGameStatistics();
      clearInterval(timer);
      rl.close();
      return;
    }

    // Switch to the other player
    // currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayer = currentPlayer === "X" ? playerOName : playerXName;
    console.log();
    console.log(`Player ${currentPlayer}'s turn:`);
  }

  // Print initial board
  printBoard(board);

  // Start the game loop
  console.log(`Player ${currentPlayer}'s turn:`);
  rl.on("line", handleInput);

  //Timeout function for game
  const timer = setInterval(() => {
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      console.log("------------------");
      console.log("Time's Over For Game!");
      console.log("------------------");
      return;
    } else {
      //console.log(formatTime(seconds));
    }
  }, 1000);
}

export function getDifficultyLevel(
  totalMovesX: number,
  totalMovesO: number
): string {
  const totalMoves = totalMovesX + totalMovesO;

  // Determine the starighforward difficulty level based on the total number of moves
  if (totalMoves <= 4) {
    return "Easy";
  } else if (totalMoves <= 6) {
    return "Medium";
  } else if (totalMoves <= 8) {
    return "Hard";
  } else {
    return "Very Hard";
  }
}

export function printGameStatistics() {
  // Calculate total game time in seconds
  const endTime: number = Date.now();
  const totalTimeInSeconds: number = Math.floor((endTime - startTime) / 1000);

  // Calculate remaining moves for each player
  const remainingMovesX: number = 5 - totalMovesX;
  const remainingMovesO: number = 5 - totalMovesO;

  console.log("--- Game Statistics ---");
  console.log(`Total game time: ${totalTimeInSeconds} seconds`);
  console.log(
    `Current Difficulty Level : [${getDifficultyLevel(
      totalMovesX,
      totalMovesO
    )}]`
  );
  console.log(`Total moves by X: ${totalMovesX}`);
  console.log(`Total moves by O: ${totalMovesO}`);
  console.log(`Total remaining moves for X: ${remainingMovesX}`);
  console.log(`Total remaining moves for O: ${remainingMovesO}`);
}

// Start the game
startGame();

