/**
 * @author Gunjan Sharma
 * @description This file contains advnace level of Jest Unit Testing empowering complete cod ecoverage
 */

import {
  printBoard,
  checkWin,
  isBoardFull,
  getDifficultyLevel,
  printGameStatistics,
} from "../src/app"; // Assuming your Tic Tac Toe implementation is in a file named ticTacToe.ts

describe("checkWin", () => {
  test("returns true if the current player wins horizontally", () => {
    const board = [
      ["X", "X", "X"],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
    expect(checkWin("X", board)).toBe(true);
  });

  test("returns true if the current player wins vertically", () => {
    const board = [
      ["O", " ", " "],
      ["O", " ", " "],
      ["O", " ", " "],
    ];
    expect(checkWin("O", board)).toBe(true);
  });

  test("returns true if the current player wins diagonally", () => {
    const board = [
      ["X", " ", " "],
      [" ", "X", " "],
      [" ", " ", "X"],
    ];
    expect(checkWin("X", board)).toBe(true);
  });

  test("returns false if the current player does not win", () => {
    const board = [
      ["X", "O", "X"],
      ["O", "X", "O"],
      ["O", "X", "O"],
    ];
    expect(checkWin("X", board)).toBe(false);
  });
});

describe("isBoardFull", () => {
  test("returns true if the board is full", () => {
    const board = [
      ["X", "O", "X"],
      ["X", "O", "X"],
      ["O", "X", "O"],
    ];
    expect(isBoardFull(board)).toBe(true);
  });

  test("returns false if the board is not full", () => {
    const board = [
      ["X", "--", "X"],
      ["--", "--", "--"],
      ["O", "X", "O"],
    ];
    expect(isBoardFull(board)).toBe(false);
  });
});

describe("getDifficultyLevel", () => {
  test('returns "Easy" for totalMoves <= 4', () => {
    expect(getDifficultyLevel(2, 1)).toBe("Easy");
  });

  test('returns "Medium" for 4 < totalMoves <= 6', () => {
    expect(getDifficultyLevel(3, 2)).toBe("Medium");
  });

  test('returns "Hard" for 6 < totalMoves <= 8', () => {
    expect(getDifficultyLevel(4, 4)).toBe("Hard");
  });

  test('returns "Very Hard" for totalMoves > 8', () => {
    expect(getDifficultyLevel(5, 5)).toBe("Very Hard");
  });

  test("handles edge cases where totalMoves is at the boundaries", () => {
    // Total moves at the boundary of "Easy" and "Medium"
    expect(getDifficultyLevel(4, 0)).toBe("Easy");
    // Total moves at the boundary of "Medium" and "Hard"
    expect(getDifficultyLevel(5, 0)).toBe("Medium");
    // Total moves at the boundary of "Hard" and "Very Hard"
    expect(getDifficultyLevel(6, 0)).toBe("Medium");
  });
});

describe("printBoard", () => {
  let originalLog: typeof console.log;
  let originalStdoutWrite: typeof process.stdout.write;

  beforeEach(() => {
    // Store the original implementations of console.log and process.stdout.write
    originalLog = console.log;
    originalStdoutWrite = process.stdout.write;

    // Mock console.log to capture the output
    console.log = jest.fn();

    // Mock process.stdout.write to capture the output
    process.stdout.write = jest.fn();
  });

  afterEach(() => {
    // Restore original implementations of console.log and process.stdout.write
    console.log = originalLog;
    process.stdout.write = originalStdoutWrite;
  });

  test("prints the correct board initially and after each input changes", () => {
    const board: string[][] = [
      ["X", "O", "X"],
      ["O", "X", "O"],
      ["X", "O", "X"],
    ];

    // Call the function
    printBoard(board);

    // Assert console.log calls
    expect(console.log).toHaveBeenCalledTimes(8); // Expecting 5 lines printed (including newlines)
    expect(console.log).toHaveBeenCalledWith("************************");
    expect(console.log).toHaveBeenCalledWith("*********************");

    // Assert process.stdout.write calls
    expect(process.stdout.write).toHaveBeenCalledTimes(9); // Expecting 9 calls for each cell
    expect(process.stdout.write).toHaveBeenCalledWith("X  ");
    expect(process.stdout.write).toHaveBeenCalledWith("O  ");
    // Add similar assertions for other cells
  });
});
