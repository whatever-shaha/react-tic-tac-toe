import {Component} from 'react'
import Board from './Board';
class Game extends Component {
  state = {
    history: [ {squares: Array(9).fill(null)} ],
    stepNumber: 0,
    isNext: true,
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calulateWinner(current.squares);
    let status;
    // console.log(history);
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = `Next player is ${this.state.isNext? "X" :"O"}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares = {current.squares} onClick={(i) => this.handleClick(i) } />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div> <hr />
            <button onClick = {() => { this.goTo(this.state.stepNumber - 1); }}> Step Back </button> <br />
            <button onClick = {() => { // the condition for checking wether exist any future steps
              const last = this.state.stepNumber +1;
              if (!(last >= this.state.history.length)) { this.goTo(last) } else { return } 
              }}> Step Forward </button> <br />
            <button onClick = {() => { this.goTo()  }} > Restart </button>
          </div>
        </div>
      </div>
    );
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);// removing future history after new step
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(this.calulateWinner(squares)) return;
    if( !squares[i] ){
      squares[i] = this.state.isNext ? "X" : "O";
      this.setState({
        history: history.concat([{squares: squares}]),
        stepNumber: history.length, 
        isNext: !this.state.isNext,
      });
      console.log("--- Game.handleClick");
    } 
  }

//cheking the winner
  calulateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }   
    }
    return null;
  }
// step selector to the move, 
  goTo(move = 0) {
    this.setState({
      stepNumber: move,
      isNext: (move % 2) === 0, // for changing the player 
    });
  }
}
export default Game;