export function calculate_winner(board) {
    /* returns null, X or O*/
    const winner_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    for (let i = 0; i < winner_combos.length; i++) {
        const comb = new Set([
            board[winner_combos[i][0]],
            board[winner_combos[i][1]],
            board[winner_combos[i][2]]])
        if (comb.size === 1 && !comb.has(null)) {
            return [...comb][0]
        }
    }
    return null
}
