import React, { Component } from 'react';
import styles from "./game.module.css";
import Board from "./board";
import {Home} from "../home/home";
import { Route, Switch } from "react-router"; 

export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                {squares: Array(9).fill(null)}
            ]
        }
    }
    

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2)===0
        })
    }
    
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if (winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }


    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)
        console.log(winner);
        let status;
        if(winner){
            if(winner === 1){
                status= "Draw";
            }
            else{
                status = "Winner is " + winner;
            }
        }
        else{
            status = "Next player is "+ (this.state.xIsNext? "X" : "O")
        }
        return (
            <>
            <a className={styles.homeBtn} href="/" >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
            </svg>
            </a>
            <h1 className={styles.title}>TIC TAC TOE</h1>
            <div className={styles.game}>
                <div className={styles.gameBoard}>
                    <Board onClick={(i)=>this.handleClick(i)}
                    squares={current.squares} 
                    />
                </div>
                <div className={styles.gameInfo}>
                    <div className={styles.info}>{status}</div>

                    <div className={styles.container}>
                        <button className={styles.newGame} onClick={()=>{this.jumpTo(0)} }>
                        <p className={styles.btnText}>  Start new game</p>
                        <div className={styles.fill}></div>
                        </button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    var draw = 1;
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }   
    }
    if (squares[0] && squares[1] && squares[2] && squares[3] && squares[4] && squares[5] && squares[6] && squares[7] && squares[8]) {
            return draw;
        }

    return null;
}

