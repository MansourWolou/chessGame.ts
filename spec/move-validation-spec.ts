import * as isPossible from '../src/move-validation'
import * as pieces from '../src/piece'
import { Chessboard, createEmptyChessboard, putPiece, Square } from '../src/chessboard';
import { Position, position } from '../src/position';
import { Move, move } from '../src/movements';
import { pathSquare } from '../src/move-validation';

let chessboard : Chessboard;


const positionA4 : Position = position(0, 3) // A4
const positionA5 : Position = position(0, 4) // A5
const positionA6 : Position = position(0, 5) // A6
const positionA7 : Position = position(0, 6) // A7
const positionA8 : Position = position(0, 7) // A8

const positionB1 : Position = position(1, 0) // B1
const positionB2 : Position = position(1, 1) // B2
const positionB6 : Position = position(1, 5) // B6

const positionC3 : Position = position(2, 1) // C3
const positionC4 : Position = position(2, 3) // C4
const positionC5 : Position = position(2, 4) // C5
const positionC6 : Position = position(2, 5) // C6
const positionC7 : Position = position(2, 6) // C7

const positionD2 : Position = position(3, 1) // D2
const positionD3 : Position = position(3, 2) // D3
const positionD4 : Position = position(3, 3) // D4
const positionD5 : Position = position(3, 4) // D5
const positionD6 : Position = position(3, 5) // D6
const positionE1 : Position = position(4, 0) // E1
const positionE4 : Position = position(4, 3) // E4
const positionE8 : Position = position(4, 7) // E8
const positionF2 : Position = position(5, 1) // F2
const positionF6 : Position = position(5, 5) // F6
const positionG3 : Position = position(6, 2) // G3
const positionG5 : Position = position(6, 4) // G5
const positionH1 : Position = position(7, 0) // H1
const positionH4 : Position = position(7, 3) // H4
const positionH7 : Position = position(7, 8) // H7

// Horizontal moves
const moveE4_H4 : Move = move(positionE4, positionH4);
const moveE4_A4 : Move = move(positionE4, positionA4);

// Vertical moves
const moveE4_E1 : Move = move(positionE4, positionE1);
const moveE4_E8 : Move = move(positionE4, positionE8);

// Diagonal moves
const moveE4_A8 : Move = move(positionE4, positionA8);
const moveE4_B1 : Move = move(positionE4, positionB1);
const moveE4_H7 : Move = move(positionE4, positionH7);
const moveE4_H1 : Move = move(positionE4, positionH1);

// Knight moves
const moveE4_F6 : Move = move(positionE4, positionF6);
const moveE4_G5 : Move = move(positionE4, positionG5);
const moveE4_F2 : Move = move(positionE4, positionF2);
const moveE4_G3 : Move = move(positionE4, positionG3);
const moveE4_D2 : Move = move(positionE4, positionD2);
const moveE4_C3 : Move = move(positionE4, positionC3);
const moveE4_C5 : Move = move(positionE4, positionC5);
const moveE4_D6 : Move = move(positionE4, positionD6);

// Impossible moves
const moveE4_C7 : Move = move(positionE4, positionC7);
const moveE4_B2 : Move = move(positionE4, positionB2);

describe("Test blackPawnMove()", () => {
    beforeEach( () => {
        chessboard = createEmptyChessboard();
    })

    it("Pawns can move forward", () => {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        let singleForward: Move = {from: positionA7, to: positionA6, isValid: true};
        expect(isPossible.blackPawnMove(chessboard, singleForward)).toBeTruthy();
    });

    it("Pawns cannot move backward", () => {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        let singleForward: Move = {from: positionA7, to: positionA8, isValid: true};
        expect(isPossible.blackPawnMove(chessboard, singleForward)).toBeFalsy();
    });

    it("When in the initial position, paws can move 2 squares forward", () => {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        let doubleForward: Move = {from: positionA7, to: positionA5, isValid: true};
        expect(isPossible.blackPawnMove(chessboard, doubleForward)).toBeTruthy();
    });

    it("When a paws has already moved, it cannot move 2 squares forward", () => {
        putPiece(chessboard, positionC6, pieces.blackPawn);
        let doubleForward: Move = {from: positionC6, to: positionC4, isValid: true}
        expect(isPossible.blackPawnMove(chessboard, doubleForward)).toBeFalsy();
    });

    it("When in the initial position, pawns cannot move 3 squares forward", () => {
        putPiece(chessboard, positionC6, pieces.blackPawn);
        let tripleForward: Move = {from: positionA7, to: positionA4, isValid: true}
        expect(isPossible.blackPawnMove(chessboard, tripleForward)).toBeFalsy();
    });

    it("When in face of another piece, pawns cannot move foreward", () => {
        putPiece(chessboard, positionA6, pieces.whitePawn);
        putPiece(chessboard, positionA7, pieces.blackPawn);
        let singleForward: Move = {from: positionA7, to: positionA6, isValid: true}
        expect(isPossible.blackPawnMove(chessboard, singleForward)).toBeFalsy();
    })

    it("Pawns cannot capture an empty square ", () => {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        let diagonalCapture: Move = {from: positionA7, to: positionB6, isValid: true}
        expect(isPossible.blackPawnMove(chessboard, diagonalCapture)).toBeFalsy();
    });

    it("Pawns cannot capture pieces of the same color", () => {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        putPiece(chessboard, positionB6, pieces.blackKing);

        let diagonalCapture: Move = {from: positionA7, to: positionB6, isValid: true}
        expect(isPossible.blackPawnMove(chessboard, diagonalCapture)).toBeFalsy();
    });

    it("Pawns can capture pieces of a different color", () => {
        putPiece(chessboard, positionA7, pieces.blackPawn);
        putPiece(chessboard, positionB6, pieces.whiteQueen);

        let diagonalCapture: Move = {from: positionA7, to: positionB6, isValid: true}
        expect(isPossible.blackPawnMove(chessboard, diagonalCapture)).toBeTruthy();
    });
});

describe("Test whitePawnMove()", () => {
    beforeEach( () => {
        chessboard = createEmptyChessboard();
    })

    it("When there is a piece in front it, pawns cannot move forward", () => {
        putPiece(chessboard, positionD4, pieces.whitePawn); // White Pawn at D4
        putPiece(chessboard, positionD5, pieces.blackPawn); // Black Pawn at D5

        let simpleFowardMove: Move = {from: positionD4, to: positionD5, isValid: true}
        expect(isPossible.whitePawnMove(chessboard, simpleFowardMove)).toBeFalsy();
    });

    it("Pawns can move forward", () => {
        putPiece(chessboard, positionD4, pieces.whitePawn); // White Pawn at D4

        let simpleFowardMove: Move = {from: positionD4, to: positionD5, isValid: true}
        expect(isPossible.whitePawnMove(chessboard, simpleFowardMove)).toBeTruthy();
    });

    it("When in the initial position, pawns can move two squares forward", () => {
        putPiece(chessboard, positionD2, pieces.whitePawn); // White Pawn at D2
        let doubleFowardMove: Move = {from: positionD2, to: positionD4, isValid: true}
        expect(isPossible.whitePawnMove(chessboard, doubleFowardMove)).toBeTruthy();
    });

    it("When they have already moved, pawns cannot move two squares forward", () => {
        putPiece(chessboard, positionD3, pieces.whitePawn); // White Pawn at D3
        let doubleFowardMove: Move = {from: positionD3, to: positionD5, isValid: true}
        expect(isPossible.whitePawnMove(chessboard, doubleFowardMove)).toBeFalsy();
    });

    it("Pawns cannot capture an empty square", () => {
        putPiece(chessboard, positionD3, pieces.whitePawn); // White Pawn at D3
        let diagonalCapture: Move = {from: positionD3, to: positionC4, isValid: true}
        expect(isPossible.whitePawnMove(chessboard, diagonalCapture)).toBeFalsy();
    });

    it("Pawns cannot capture a piece of the same color", () => {
        putPiece(chessboard, positionD3, pieces.whitePawn); // White Pawn at D3
        putPiece(chessboard, positionC4, pieces.whitePawn); // White Pawn at C4

        let diagonalCapture: Move = {from: positionD3, to: positionC4, isValid: true}
        expect(isPossible.whitePawnMove(chessboard, diagonalCapture)).toBeFalsy();
    });

    it("Pawns can capture pieces of a different color", () => {
        putPiece(chessboard, positionD3, pieces.whitePawn); // White Pawn at D3
        putPiece(chessboard, positionC4, pieces.blackKing); // Black King at C4

        let diagonalCapture: Move = {from: positionD3, to: positionC4, isValid: true}
        expect(isPossible.whitePawnMove(chessboard, diagonalCapture)).toBeTruthy();
    })
});

/**
 * TODO: Unit tests for function kingMove()
 */
describe("Test kingMove()", () => {
    beforeEach( () => {
        // TODO:
        // Initialize an empty chessboard
        // Place a black King on E4
    });

    it("A King can move 1 square in all directions", () => {
        // Check it can move to squares D3, D4, D5, E3, E5, F3, F4, and F5
    })

    it("A King cannot move more than 1 square", () => {
        // Check it cannot move to squares C2, C3, C4, C6, D4, and F4
    })

    it("A King cannot capure pieces from the same color", () => {
        // Place a black Pawn on E5
        // Check the King cannot move to E5.
    })

    it("A King can capure pieces from a different color", () => {
        // Place a white Pawn on E5
        // Check the King can move to E5.
    })
});

/**
 * TODO: Unit tests for function queenMove()
 */
describe("Test queenMove()", () => {
    beforeEach( () => {
        // TODO:
        // Initialize an empty chessboard
        // Place a white Queen on E4
    });

    it("A Queen can move diagonally", () => {
        // TODO:
        // Check the following moves are possible: 
        // moveE4_A8, moveE4_B1, moveE4_H7, moveE4_H1
    });

    it("A Queen can move horizontally", () => {
        // TODO:
        // Check the following moves are possible: moveE4_H4, moveE4_A4
    });

    it("A Queen can move vertically", () => {
        // TODO:
        // Check the following moves are possible: moveE4_E1, moveE4_E8
    });

    it("A Queen can only move horizontally, vertically, and diagonally", () => {
        // TODO:
        // Check the following moves are impossible: moveE4_C7, moveE4_B2
    });

    it("A Queen cannot leap other pieces", () => {
        // TODO:
        // Place a white Pawn on C6 and  a black Pawn on F4
        // Check the moves moveE4_A8 and moveE4_H4 are impossible
    });

    it("A Queen cannot capure pieces from the same color", () => {
        // TODO:
        // Place a white Pawn on H4
        // Check the move moveE4_H4 is impossible
    });

    it("A Queen can capure pieces from a different color", () => {
        // TODO:
        // Place a black Pawn on H4
        // Check the move moveE4_H4 is possible
    });
});

/**
 * TODO: Unit tests for function bishopMove()
 */
describe("Test bishopMove()", () => {
    beforeEach( () => {
        // TODO:
        // Initialize an empty chessboard
        // Place a black Bishop on E4
    });

    it("A Bishop can move diagonally", () => {
        // TODO:
        // Check the following moves are possible: 
        // moveE4_A8, moveE4_B1, moveE4_H7, moveE4_H1
    });

    it("A Bishop cannot move horizontally", () => {
        // TODO:
        // Check the following moves are impossible: moveE4_H4, moveE4_A4
    });

    it("A Bishop cannot move vertically", () => {
        // TODO:
        // Check the following moves are impossible: moveE4_E1, moveE4_E8
    });

    it("A Bishop can capture a piece from another color", () => {
        // TODO:
        // Place a white Pawn on A8
        // Check the move moveE4_A8 is possible

    });

    it("A Bishop cannot capture a piece from the same color", () => {
        // TODO:
        // Place a black Pawn on A8
        // Check the move moveE4_A8 is impossible
    });

    it("A Bishop cannot leap other pieces", () => {
        // TODO:
        // Place a white Pawn on C6
        // Check the move moveE4_A8 is impossible
   });
});

/**
 * TODO: Unit tests for function knightMove()
 */
describe("Test knightMove()", () => {
    beforeEach( () => {
        // TODO:
        // Initialize an empty chessboard
    });
    it("A Knight can move two squares horizontally and one square vertically", () => {
        // TODO:
    })
    it("A Knight can move two squares vertically and one square horizontally", () => {
        // TODO:
    })
    it("A Knight can 'jump' obstacles" , () => {
        // TODO:
    })
    it("A Knight can move diagonally", () => {
        // TODO:
    });
    it("A Knight cannot move horizontally", () => {
        // TODO:
    });
    it("A Knight cannot move vertically", () => {
        // TODO:
    });
    it("A Knight can capture a piece from another color", () => {
        // TODO:
    });
    it("A Knight cannot capture a piece from the same color", () => {
        // TODO:
    });
});

/**
 * TODO: Unit tests for function rookMove()
 */
describe("Test rookMove()", () => {
    beforeEach( () => {
        // TODO:
        // Initialize an empty chessboard
        chessboard = createEmptyChessboard();
        // Place a white Rook on E4
        putPiece(chessboard,positionE4,pieces.blackRoock);
    });

    it("A roock can move horizontally", () => {
        // Check the following moves are possible: moveE4_H4, moveE4_A4
        expect(isPossible.rookMove(chessboard, moveE4_H4)).toBeTruthy();
        expect(isPossible.rookMove(chessboard, moveE4_A4)).toBeTruthy();
    });

    it("A roock can move vertically", () => {
        // Check the following moves are possible: moveE4_E1, moveE4_E8
        expect(isPossible.rookMove(chessboard, moveE4_E1)).toBeTruthy();
        expect(isPossible.rookMove(chessboard, moveE4_E8)).toBeTruthy();
    });

    it("A roock cannot move diagonally", () => {
        // TODO:
        // Check the following moves are impossible: 
        // moveE4_A8, moveE4_B1, moveE4_H7, moveE4_H1

    });

    it("A roock can capture a piece from another color", () => {
        // TODO:
        // Place a black Pawn on H4
        // Check the move moveE4_H4 is possible
    });

    it("A roock cannot capture a piece from the same color", () => {
        // TODO:
        // Place a white Pawn on H4
        // Check the move moveE4_H4 is impossible
    });

    it("A Roock cannot leap other pieces", () => {
        // TODO:
        // Place a black Pawn on F4
        // Check the move moveE4_H4 is impossible
   });
}); 
/*
describe("Test pathSquare()", () => {
    //let path : Array<Square> = new Array(8);
    //var arr = pathSquare(chessboard, positionE4 , positionH4);
    //console.log(arr[0]);
    //{"position":{"rank":4,"file":3},"isEmpty":true}
    beforeEach(() => {
        chessboard = createEmptyChessboard();
        putPiece(chessboard,positionE4,pieces.blackRoock);
        putPiece(chessboard,positionH4,pieces.whiteRoock);
    });
    it("A path contain zero square", () => {//{"position":{"rank":4,"file":5},"isEmpty":true}
    var arri = pathSquare(chessboard,positionE4,positionH4);
        var result = [
            {
            "position":{"rank":4,"file":6},
            "isEmpty":true
            },
            {
            "position":{"rank":4,"file":7},
            "isEmpty":true
            },
            {
            "position":{"rank":4,"file":8},
            "isEmpty":false,
            "piece":{"symbol":"â™–","name":"White Pawn","isWhite":true}
            }
        ];
       expect(arri).toEqual(result);
    });
});
*/