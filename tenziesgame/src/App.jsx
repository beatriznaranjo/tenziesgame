import { React, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './Die'
import {nanoid} from "nanoid"
import { faWheatAwnCircleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  
  function generateNewDie() {
      return {
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      }
  }

  //Creando 10 numeros random para los dados 
  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice    
  } 

    //Funcion para volver a tirar los dados usando el botón 
    function rollNewDice() {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ?
            die: 
            generateNewDie()             
      }))
    
    }
  
    //Funcion para "sostener" los dados al hacer click
    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ? 
              {...die, isHeld: !die.isHeld} : 
              die
          })
        )       
    }

  //Seteando lo que mostrará cada dado haciendo uso de .map en el array que contiene los objetos (dados) generados
  const diceElements = dice.map((die) => {
    return (
      <Die 
        key = {die.id}
        value = {die.value}
        isHeld = {die.isHeld}
        holdDice = {() => holdDice(die.id)}
      />
    ) 
  }) 




  return (
    <main className="main">
      <div className="main-body">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice--container">
          {diceElements}
        </div>
        <button onClick={rollNewDice} className="roll-button">Roll Dice</button>
      </div>
    </main>
  )
}
