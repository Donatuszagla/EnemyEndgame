import './App.css'

import GameStatus from './Status';
import ProgLang from './ProgLang';
import { nanoid } from 'nanoid';
import Key from './Key';
import AllLangs from './AllLang';
import { useRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { getFarewellText, randomWord } from './utils';
import Confetti from 'react-confetti'




function App(){

  const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const [currentWord, setCurrentWord] = useState(() => randomWord())
  const [guessLetters, setGuessLetters] = useState([])
  const wrongGuessCount = guessLetters.filter(letter => !currentWord.toUpperCase().includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guessLetters.includes(letter))
  const isGameLost = wrongGuessCount > AllLangs.length - 2
  const isGameOver = isGameLost || isGameWon
  const lastGuessedLetter = guessLetters[guessLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
  const newGameRef = useRef(null)
  
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHieght] = useState(window.innerHeight)
  
  window.addEventListener("resize", ()=>{
    setHieght(window.innerHeight)
    setWidth(window.innerWidth)
  })

  function userGuess(event){
    let currentGuess = event.currentTarget.innerHTML
    setGuessLetters(prev => {
      // prev.includes(currentGuess) ? prev : [...prev, currentGuess];
      const lettersSet = new Set(prev)
      lettersSet.add(currentGuess)
      return Array.from(lettersSet)
  })
  }

  function startNewGame(){
    setCurrentWord(randomWord())
    setGuessLetters([])
  }
  useEffect(() => {
    if (newGameRef.current) {
      newGameRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isGameOver]);

  return <>
    <main>
      <div className="game-title">
        <h1>Enemy👹: Endgame!</h1>
        <p>Guess the word in under 8 attempts to keep your family safe from the Enemy👹!</p>
      </div>
      
      {!isGameOver && !isLastGuessIncorrect && <GameStatus message={""} heading={""} className={"game-status-container"}/>}
      {!isGameOver && isLastGuessIncorrect && <GameStatus message={getFarewellText(AllLangs[wrongGuessCount - 1].text)} heading={undefined} className={"farewell"}/>}
      {isGameWon && <>
                      <GameStatus message={`You've saved ${8 - wrongGuessCount} relatives🥰`} heading={"You Win!💙"} className={"is-won"}/>
                      <Confetti 
                            width={width}
                            height={height}
                            recycle={false}
                            numberOfPieces={10000}
                      
                      />
                    </>
                    }
      {isGameLost && <GameStatus message={"You lose! Better start fighting your enemy💔"} heading={"Game over!"} className={"is-lost"}/>}
      <div className="all-lang">
        {AllLangs.map((lang, index) => {
          
          const cClassName = clsx("lang-container" ,{
            "lost": wrongGuessCount >= index + 1
        })

          return (<ProgLang key={lang.text} 
                            text={lang.text} 
                            color={lang.color}
                            className={cClassName}
                  />)})}
      </div>
      <div className="current-word">
        {currentWord.split("").map((letter, index) => {
          const shouldRevealLetter = isGameLost || guessLetters.includes(letter)
          const letterClassName = clsx(
            isGameLost && !guessLetters.includes(letter) && "missed-letter"
        )
        
            return (<span key={index} className={letterClassName}>{shouldRevealLetter && letter.toLowerCase()}</span>)
            })}
      </div>
      <div className="keyboard">
        {alphabets.map((alphabet) => {
          
          const isGuessed = guessLetters.includes(alphabet);
          const isCorrect = isGuessed && currentWord.toUpperCase().includes(alphabet);
          const isWrong = isGuessed && !currentWord.toUpperCase().includes(alphabet);

          const conditionalClass = clsx("key-btn", {
            "is-correct": isCorrect,
            "is-wrong": isWrong
            
          });

          return (<Key key={alphabet} 
              value={alphabet} 
              onClick={userGuess} 
              className={conditionalClass}
              isGameOver={isGameOver}
              />)})}
      </div>
      {isGameOver && <button className="new-game" onClick={startNewGame} ref={newGameRef}>New Game</button>}
      <footer className="empty-space">
      © {new Date().getFullYear()} Donatus Zagla. All rights reserved.
      </footer>
    </main>
  
  </>
}


export default App;