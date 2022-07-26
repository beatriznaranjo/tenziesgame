import { React, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './Die'

export default function App() {
  const [dice, setDice] = useState(allNewDice())



  //Creating a 10-length array of numbers between 1-6
  function allNewDice() {
    const randomArray = []
    for(let i = 0; i < 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6)
      randomArray.push(randomNumber)
    }
    return randomArray
  } 


  const diceElements = dice.map((number) => {
    return (
      <Die 
        key={number}
        value={number}
        />

    ) 
  })


  return (
    <main className="main">
      <div className="main-body">
        <div className="dice--container">
          {diceElements}
        </div>
        <button onClick={rollNewDice}>Roll Dice</button>
      </div>
    </main>
  )
}
