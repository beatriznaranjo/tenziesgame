import { React, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './Die'
import {nanoid} from "nanoid"

export default function App() {

  const [dice, setDice] = useState(allNewDice())



  //Creando 10 numeros random para los dados 
  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      const randomNumber = Math.ceil(Math.random() * 6)
      newDice.push({
        value: randomNumber, 
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice    
  } 

  //Seteando el numero que mostrará cada dado haciendo uso de .map en el array random generado
  const diceElements = dice.map((die) => {
    return (
      <Die 
        key = {die.id}
        value = {die.value}
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
