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

  //Seteando el numero que mostrará cada dado haciendo uso de .map en el array random generado
  const diceElements = dice.map((number) => {
    return (
      <Die 
        value={number}
        />
    ) 
  }) 

  //Funcion para volver a tirar los dados usando el botón 
  function rollNewDice() {
    setDice(allNewDice())
  }


  return (
    <main className="main">
      <div className="main-body">
        <div className="dice--container">
          {diceElements}
        </div>
        <button onClick={rollNewDice} className="roll-button">Roll Dice</button>
      </div>
    </main>
  )
}
