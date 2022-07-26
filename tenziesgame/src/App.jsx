import { React, useEffect, useState } from 'react'
import './App.css'
import Die from './Die'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = useState(allNewDice())

  //tenzies representa si se ha ganado el juego o no
  const [tenzies, setTenzies] = useState(false)


  //Efecto que corre solo cuando el estado de los dados cambia
  useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld === true)
    const numbers = dice.map(die => die.value)
    const allSameNumbers = numbers.every(number => number === numbers[0])
    if (allHeld && allSameNumbers) {
      console.log("Yow won the game")
      setTenzies(true)
    }
  }, [dice])

  
  //Generar dado nuevo> objeto
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

    //function Reset game
    function resetGame() {
      setDice(allNewDice())
      setTenzies(false)
    }

    //Funcion dependiente del estado del juego
    function gameStatus() {
      tenzies ? resetGame() : rollNewDice()
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
      {tenzies && <Confetti />}
      <div className="main-body">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice--container">
          {diceElements}
        </div>
        <button onClick={gameStatus} className="roll-button">{tenzies ? "Play again" : "Roll new dice"}</button>
      </div>
    </main>
  )
}
