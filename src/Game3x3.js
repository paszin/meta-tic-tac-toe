import React from "react";
import {calculate_winner} from "./helpers";

function Square(props) {
    return (
        <button className="square" onClick={props.clickHandler}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    render() {
        return (
            <div className="grid-wrapper">
                {this.props.squares.map((v, i) => {
                    return (<Square key={i} value={v} clickHandler={() => this.props.clickHandler(i)}></Square>)
                })}
            </div>
        );
    }
}

class Game3x3 extends React.Component {

    render() {

        const winner = calculate_winner(this.props.board)
        return (
            <div className="game">
                <div className={`game-board ${this.props.highlight ? "highlight" : ""}`}>
                    <span className="game-board-background">{winner}</span>
                    <Board
                        squares={this.props.board}
                        clickHandler={this.props.clickHandler}
                    />
                </div>

            </div>
        );
    }
}

export default Game3x3;
