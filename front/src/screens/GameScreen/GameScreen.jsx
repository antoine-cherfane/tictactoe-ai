import React, { useEffect, useState } from 'react';
import './GameScreenStyle.css';
import Square from '../../components/Square';
import {FiRotateCcw} from 'react-icons/fi'
import { io } from 'socket.io-client';

const URI = "http://localhost:5000";
const EVENTS = {
    INIT_PARAMS: "init_params",
    GAME_STATE: "game_state"
};
const GAME_STATUS = {
    INITIAL: "INITIAL",
    IN_PROGRESS: "IN_PROGRESS",
    PENDING: "PENDING",
    DONE: "DONE",
};


const BOARD_CLASSES = [ "show", "show1", "show", "show1", "show2", "show3", "show", "show3", "show" ];
const INITIAL_GAME_PARAMS = {
    board_size: 3,
    empty_value: " "
};
const INITIAL_GAME_STATE = {
    board: new Array(INITIAL_GAME_PARAMS.board_size ** 2).fill(INITIAL_GAME_PARAMS.empty_value),
    status: null,
    result: null,
    turn: null
};
let socket;
export default function GameScreen(props) {
    const [gameParams, setGameParams] = useState(INITIAL_GAME_PARAMS);
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);

    useEffect(() => {
        socket = io(URI);
        socket.on(EVENTS.GAME_STATE, (data) => {
            setGameState(data);
        });
        
        socket.on(EVENTS.INIT_PARAMS, (data) => {
            setGameParams(data);
        });

        return () => socket.close();
    }, []);

    useEffect(() => {
        if (player1 !== null && player2 !== null) {
            socket.emit("init_game", { p1: player1, p2: player2 });
        }
    }, [player1, player2]);

    const handleClick = (index) => {
        if (gameState.status !== GAME_STATUS.PENDING || gameState.board[index] !== gameParams.empty_value) return;
        socket.emit("make_move", { position: index });
    }

    const handleRetry = () => {
        setPlayer1(null);
        setPlayer2(null);
    }

    const getHeaderText = () => {
        let headerText = "";
        if (player1 === null || player2 === null) headerText = "Select Players";
        else if (gameState.status === GAME_STATUS.DONE) {
            if (gameState.result === 0) headerText = "Draw";
            else if (gameState.result === 1) headerText = "Player 1 won";
            else if (gameState.result === 2) headerText = "Player 2 won";
        }
        else if (gameState.turn === "X") headerText = "Player 1 to play";
        else if (gameState.turn === "O") headerText = "Player 2 to play";
        return headerText;
    }

    const disable = (player1 && player2)? ' disable' : ''

    return (
        <div className="main">
            <div className='player1'>
                <h1>Player 1 (X)</h1>
                <button className={'playerButton' + (player1 === 'Human' ? " selected" : '') + (disable)}onClick={() => setPlayer1('Human')} >Human</button>
                <button className={'playerButton' + (player1 === 'Minimax' ? " selected" : '') + (disable)}onClick={() => setPlayer1('Minimax')}>Minimax</button>
                <button className={'playerButton' + (player1 === 'Expectimax' ? " selected" : '') + (disable)}onClick={() => setPlayer1('Expectimax')}>Expectimax</button>
                <h2>{player1}</h2>
            </div>
            <div className="board">
                <p className='header-text'>{getHeaderText()}</p>
                {player1 && player2 && <div className='game' >
                    {gameState.board.map((value, index) => (
                        <Square key={index} className={BOARD_CLASSES[index]}  onclick={() => handleClick(index)} value={value} />
                    ))}
                </div>}

            <button className='retry' onClick={handleRetry} ><FiRotateCcw size={50} /></button>
            </div>
            <div className='player1'>
                <h1>Player 2 (O)</h1>
                <button className={'playerButton' + (player2 === 'Human' ? " selected" : '') + (disable)}onClick={() => setPlayer2('Human')}>Human</button>
                <button className={'playerButton' + (player2 === 'Minimax' ? " selected" : '') + (disable)}onClick={() => setPlayer2('Minimax')}>Minimax</button>
                <button className={'playerButton' + (player2 === 'Expectimax' ? " selected" : '') + (disable)}onClick={() => setPlayer2('Expectimax')}>Expectimax</button>
                <h2>{player2}</h2>
            </div>
        </div>
    );
}