import {parseMoveString,Move} from "../src/movements"
import {Position, equals} from "../src/position"

describe("parseMoveString", () => {
    it("A2-A4", () => {
        let move: Move = parseMoveString("A2-A4");
        let expectedFrom: Position = {file: 0, rank:1}
        let expectedTo: Position = {file:0, rank:3}
        expect(move.isValid).toBeTruthy();
        expect(equals(expectedFrom, move.from!)).toBeTruthy();
        expect(equals(expectedTo, move.to!)).toBeTruthy();
    });
    
    it("B8-B3", () => {
        let move: Move = parseMoveString("B8-B3");
        let expectedFrom: Position = {file: 1, rank:7}
        let expectedTo: Position = {file:1, rank:2}
        expect(move.isValid).toBeTruthy();
        expect(equals(expectedFrom, move.from!)).toBeTruthy();
        expect(equals(expectedTo, move.to!)).toBeTruthy();
    });

    it("H8-H3", () => {
        let move: Move = parseMoveString("H8-H3");
        let expectedFrom: Position = {file: 7, rank:7}
        let expectedTo: Position = {file:7, rank:2}
        expect(move.isValid).toBeTruthy();
        expect(equals(expectedFrom, move.from!)).toBeTruthy();
        expect(equals(expectedTo, move.to!)).toBeTruthy();
    });

    it("a1-h8 == A1-H8", () => {
        let lowercaseMove: Move = parseMoveString("a1-h8");
        let uppercaseMove: Move = parseMoveString("A1-H8");

        expect(lowercaseMove.isValid).toBeTruthy();
        expect(uppercaseMove.isValid).toBeTruthy();

        expect(equals(lowercaseMove.from!, uppercaseMove.from!)).toBeTruthy();
        expect(equals(lowercaseMove.to!, uppercaseMove.to!)).toBeTruthy();
    });

})