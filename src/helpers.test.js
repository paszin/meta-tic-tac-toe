import {calculate_winner} from "./helpers";


it('calculates the winner', () => {
    const board = ["o", "x", "x", null, null, null, null, null, null]
    expect(calculate_winner(board)).toEqual(null)
    board[0] = "x"
    expect(calculate_winner(board)).toEqual("x")

});
