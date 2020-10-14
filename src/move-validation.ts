import { Chessboard, isEmpty, Square, squareAtPosition } from "./chessboard";
import { Move } from "./movements";
import { equals, left, right, bottom, top } from "./position";

/**
 * Checks whether a Black Pawn can perform a given move.
 * A pawn can move forward to the unoccupied square immediately in front of 
 * it on the same file, or on its first move it can advance two squares along 
 * the same file, provided both squares are unoccupied (black dots in the 
 * diagram); or the pawn can capture an opponent's piece on a square diagonally 
 * in front of it on an adjacent file, by moving to that square (black "x"s). 
 * 
 * A pawn has two special moves: the en passant capture and promotion.
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function blackPawnMove(board: Chessboard, move: Move): boolean {
    // #TODO: Manage special 'En passant' move.

    if (equals(move.to!, top(move.from!))) {
        //console.log("Single forward");
        return isEmpty(board, move.to!);
    }

    if (move.from!.rank === 6 && equals(move.to!, top(top(move.from!)))) {
        //console.log("Double forward");
        return isEmpty(board, top(move.from!)) && isEmpty(board, move.to!);
    }

    if (equals(move.to!, left(top(move.from!))) || equals(move.to!, right(top(move.from!)))) {
        let destination: Square = squareAtPosition(board, move.to!);
        return !(destination.isEmpty || !destination.piece!.isWhite)
    }

    return false;
}

/**
 * A pawn can move forward to the unoccupied square immediately in front of 
 * it on the same file, or on its first move it can advance two squares along 
 * the same file, provided both squares are unoccupied (black dots in 
 * the diagram); or the pawn can capture an opponent's piece on a square diagonally 
 * in front of it on an adjacent file, by moving to that square (black "x"s). 
 * 
 * A pawn has two special moves: the en passant capture and promotion.
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function whitePawnMove(board: Chessboard, move: Move): boolean {
    // #TODO: Manage special 'En passant' move.

    if (equals(move.to!, bottom(move.from!))) {
        return isEmpty(board, move.to!);
    }

    if (move.from!.rank === 1 && equals(move.to!, bottom(bottom(move.from!)))) {
        return isEmpty(board, bottom(move.from!)) && isEmpty(board, move.to!);
    }

    if (equals(move.to!, left(bottom(move.from!))) || equals(move.to!, right(bottom(move.from!)))) {
        let destination: Square = squareAtPosition(board, move.to!);
        return !(destination.isEmpty || destination.piece!.isWhite)
    }

    return false;
}

/**
 * Checks whether a King can perform a given move.
 * The king moves one square in any direction. 
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function kingMove(board: Chessboard, move: Move): boolean {
    // #TODO: Implement this function
    return true;
}

/**
 * Checks whether a Queen can perform a given move.
 * The queen combines the power of a rook and bishop and can move any 
 * number of squares along a rank, file, or diagonal, but cannot leap over other pieces.
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function queenMove(board: Chessboard, move: Move): boolean {
    // #TODO: Implement this function
    return true;
}

/**
 * Checks whether a Rook can perform a given move.
 * A rook can move any number of squares along a rank or file, 
 * but cannot leap over other pieces. 
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function rookMove(board: Chessboard, move: Move): boolean {
    // #TODO: Implement this function
    return true;
}

/**
 * Checks whether a Bishop can perform a given move.
 * A bishop can move any number of squares diagonally, 
 * but cannot leap over other pieces.
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function bishopMove(board: Chessboard, move: Move): boolean {
    // #TODO: Implement this function
    return true;
}

/**
 * Checks whether a Knight can perform a given move.
 * A knight moves to any of the closest squares that are not on the 
 * same rank, file, or diagonal. (Thus the move forms an "L"-shape: 
 * two squares vertically and one square horizontally, or two 
 * squares horizontally and one square vertically.) 
 * 
 * The knight is the only piece that can leap over other pieces.
 * 
 * @param board The chessboard of the current game
 * @param move 
 */
export function knightMove(board: Chessboard, move: Move): boolean {
    // #TODO: Implement this function
    return true;
} 