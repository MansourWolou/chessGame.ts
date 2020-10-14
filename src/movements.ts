import { Chessboard, squareAtPosition, Square } from './chessboard'
import { Position } from "./position";
import * as pieces from './piece'
import {Piece}  from './piece'
import * as isPossible from './move-validation'

const VALID_MOVE_STRING: RegExp = new RegExp('([a-z]|[A-Z])([1-8])-([A-H]|[a-z])([1-8])')

export interface Move {
    isValid : boolean;
    from?   : Position;
    to?     : Position;
}

/**
 * Creates a new Move from two Positions, representing
 * the Move's initial and final position.
 * 
 * @param from The initial position
 * @param to The final position
 */
export function move(from: Position, to: Position): Move {
    let move: Move = {from: from, to: to, isValid: true};
    return move;
}

/**
 * Processes a move received from a client browser.
 * If the move is valid and possible, the move is performed and this function
 * returns true. Otherwise, it returns false
 * 
 * @param chessboard The chessboard for the current game
 * @param moveString The string received from the client containing a move
 * @returns true, if the move is valid and possible
 */
export function processMove(chessboard:Chessboard, moveString: string): boolean {
    let move : Move = parseMoveString(moveString);

    if (move.isValid && isMovePossible(chessboard, move)) {
        performMove(chessboard, move); 
    } else {
        console.log("Invalid movement !");
        return false;
    }
    return true;
}

/**
 * Parses a string in the format "A1-F8" and returns a Move.
 * If the format is not valid, returns a Move with isValid === false.
 * 
 * @param movementString A 5 characters string containing a move
 */
export function parseMoveString(movementString: string): Move {
    let newMove : Move;
    if (movementString.length != 5 ||  ! movementString.match(VALID_MOVE_STRING)) {
        let invalidMove : Move = {isValid : false};
        newMove = invalidMove;
    } else {
        let fromFile  : number = movementString.charCodeAt(0);
        let fromRank    : number = parseInt(movementString[1]);
        let toFile      : number = movementString.charCodeAt(3);
        let toRank      : number = parseInt(movementString[4]);

        // In Unicode, charCode('A') == 65, charCode('a') == 97
        // Remember that Arrays start from [0][0] == position 'A1'
        let from : Position = {rank : fromRank -1, file: fromFile > 90 ? fromFile - 97 : fromFile - 65}
        let to   : Position = {rank : toRank -1, file: toFile > 90 ? toFile - 97 : toFile - 65 }

        newMove = {isValid: true, from: from, to: to}
    }
    return newMove;
}

/**
 * Checks whether a move is possible in the given chessboard
 * @param chessboard 
 * @param move 
 */
function isMovePossible(chessboard : Chessboard, move : Move): boolean {
    let square: Square = squareAtPosition(chessboard, move.from!);
    if (square.isEmpty) { return false;}

    let piece : Piece = square.piece!;

    switch(piece) {
        case pieces.whitePawn  : return isPossible.whitePawnMove(chessboard, move);
        case pieces.blackPawn  : return isPossible.blackPawnMove(chessboard, move);
        case pieces.whiteKing  : return isPossible.kingMove(chessboard, move);
        case pieces.whiteQueen : return isPossible.queenMove(chessboard, move);
        case pieces.whiteBishop: return isPossible.bishopMove(chessboard, move);
        case pieces.whiteKnight: return isPossible.knightMove(chessboard, move);
        case pieces.whiteRoock : return isPossible.rookMove(chessboard, move);
        case pieces.blackKing  : return isPossible.kingMove(chessboard, move);
        case pieces.blackQueen : return isPossible.queenMove(chessboard, move);
        case pieces.blackBishop: return isPossible.bishopMove(chessboard, move);
        case pieces.blackKnight: return isPossible.knightMove(chessboard, move);
        case pieces.blackRoock : return isPossible.rookMove(chessboard, move);
    }

    return false;
}

function performMove(board : Chessboard, move : Move) {
    let source      : Square = squareAtPosition(board, move.from!);
    let destination : Square = squareAtPosition(board, move.to!);

    destination.piece = source.piece;
    destination.isEmpty = false;
    source.isEmpty = true;
}
