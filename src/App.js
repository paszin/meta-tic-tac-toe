import './App.css';


import Game3x3 from "./Game3x3";
import React from "react";
import {calculate_winner} from "./helpers";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: Array(9).fill(null).map(() => Array(9).fill(null)),
            turns: 0,
            active_board_index: null, // the board index of the gameboard where to play next
            winner_board: Array(9).fill(null),
            history: []
        }
    }

    undo() {
        const last_state = this.state.history[this.state.history.length - 1]
        const new_history = this.state.history.slice(0, this.state.history.length - 2)
        this.setState({...last_state, history: new_history})

    }

    getNextPlayer() {
        return "XO"[this.state.turns % 2]
    }

    handleClick(board_index, square_index) {
        this.setState({
            history: this.state.history.concat([{
                board: JSON.parse(JSON.stringify(this.state.board)),
                turns: this.state.turns,
                active_board_index: this.state.active_board_index,
                winner_board: JSON.parse(JSON.stringify(this.state.winner_board))
            }])
        })
        const board = this.state.board.slice()
        if (board[board_index][square_index] !== null ||
            (this.state.active_board_index && board_index !== this.state.active_board_index)) {
            // square is already clicked
            return
        }
        board[board_index][square_index] = this.getNextPlayer()
        // update winners board
        const new_winner_board = this.state.board.map((squares, i) => {
            if (this.state.winner_board[i] === null && calculate_winner(squares) !== null) {
                return calculate_winner(squares)
            }
            return this.state.winner_board[i]
        })
        // compute active board index
        // in case active board is already full, allow all boards
        let new_active_board_index = square_index
        if (board[square_index].indexOf(null) === -1) {
            new_active_board_index = null
        }
        this.setState({
            board: board,
            turns: this.state.turns + 1,
            active_board_index: new_active_board_index,
            winner_board: new_winner_board
        })
    }


    render() {
        const getGameBoards = () => {
            let content = [];
            for (let i = 0; i < 9; i++) {
                const board_winner = this.state.winner_board[i]
                content.push(<Game3x3 key={i} index={i} board={this.state.board[i]} board_winner={board_winner}
                                      clickHandler={(square_index) => this.handleClick(i, square_index)}
                                      highlight={this.state.active_board_index === i}></Game3x3>);
            }
            return content;
        };
        const getInfoText = () => {

            const winner = calculate_winner(this.state.winner_board)
            if (winner) {
                return (<span><span className="square-header">{winner}</span> wins!</span>)
            }
            return (<span>Next Player: <span className="square-header">{this.getNextPlayer()}</span></span>)
        }
        return (
            <div className="App">
                <header className="App-header">
                    Meta TicTacToe
                    <span><button className="undo-button" onClick={() => this.undo()}>undo</button> {getInfoText()} </span>
                </header>
                <div className="container">
                    <div className="grid-wrapper">
                        {getGameBoards()}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
