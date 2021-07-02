import React from 'react'
import { Component } from 'react'
import Button from './Button.js'
import '../css/ticTacToe.css'
import * as utils from './functions.js'
import { Storage } from './storage.js'

class TicTacToe extends Component {

  constructor(){
    super();
    this.state = {
      boxes : Array(9).fill(null),
      xIsNext : true,
      history : []
    }
    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleBoardRestart = this.handleBoardRestart.bind(this);
  }
  storage = new Storage()
  onClickHandler(index){
    const boxes = this.state.boxes.slice()
    let history = this.state.history

    if (utils.findWinner(boxes) || boxes[index]) {
        return
    }
    if(utils.areAllBoxesClicked(boxes) === true) {
        return
    }

    boxes[index] = this.state.xIsNext ? 'X' : 'O'

    history.push(this.state.xIsNext ? 'X' : 'O')

    this.setState({
      boxes: boxes,
      history: history,
      xIsNext: !this.state.xIsNext
    })
}
handleBoardRestart(){
        this.setState({
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        })
    }

  render(){
    const winner = utils.findWinner(this.state.boxes)

    const isFilled = utils.areAllBoxesClicked(this.state.boxes)

    let status

        if (winner) {
            status = `The winner is: ${winner}!`
            this.storage.update([`${winner} won`])
        } else if(!winner && isFilled) {
            status = 'Game drawn!'
            this.storage.update(['Game drawn'])
        } else {
            status = `${(this.state.xIsNext ? 'X' : 'O')}'s turn`
        }

    return(
      <>
      <h2 className="board-heading">{status}</h2>
      <div className='ticTacToe-grid'>
        <div className='grid-items'>
          <Button label={this.state.boxes[0]} onClick = { () => this.onClickHandler(0) } />
          <Button label={this.state.boxes[1]} onClick = { () => this.onClickHandler(1) }/>
          <Button label={this.state.boxes[2]} onClick = { () => this.onClickHandler(2) }/>
          <Button label={this.state.boxes[3]} onClick = { () => this.onClickHandler(3) }/>
          <Button label={this.state.boxes[4]} onClick = { () => this.onClickHandler(4) }/>
          <Button label={this.state.boxes[5]} onClick = { () => this.onClickHandler(5) }/>
          <Button label={this.state.boxes[6]} onClick = { () => this.onClickHandler(6) }/>
          <Button label={this.state.boxes[7]} onClick = { () => this.onClickHandler(7) }/>
          <Button label={this.state.boxes[8]} onClick = { () => this.onClickHandler(8) }/>
        </div>
        <input type='button' value='Reset' className='reset-btn' onClick = { () => this.handleBoardRestart() } />
      </div>

      </>
    )
  }
}
export default TicTacToe;
