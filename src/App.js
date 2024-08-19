import './App.css';
import Home from './Home';
import { useEffect, useState } from 'react';

const cardImages = [
  {src: '/img/helmet-1.png', matched: false},
  {src: '/img/potion-1.png', matched: false},
  {src: '/img/ring-1.png', matched: false},
  {src: '/img/scroll-1.png', matched: false},
  {src: '/img/shield-1.png', matched: false},
  {src: '/img/sword-1.png', matched: false}
]

function App() {

const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);
const [choiceOne, setChoiceOne] = useState(null);
const [choiceTwo, setChoiceTwo] = useState(null);
const [disabled, setDisabled] = useState(false);

const handleSort = () => {
  const shuffledCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => (
    {...card, id: Math.random()}
  ))
  setCards(shuffledCards)
  setTurns(0)
  setChoiceOne(null)
  setChoiceTwo(null)
}

const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

useEffect(() => {
  if (choiceOne && choiceTwo) {
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      console.log('cards do match')
      console.log(turns)
      resetTurn()
    } else {
      setTimeout(() => {
        console.log('cards do not match')
        resetTurn()
      }, 1000)
    }
  }
}, [choiceOne, choiceTwo, turns])

useEffect(() => {
  handleSort()
}, [])


const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}


  return (
    <div className="App max-w-screen-md mx-4 md:mx-auto">
      <main>
        <h2 className='text-white mt-4 mb-4 font-bold text-3xl text-center'>Magic Memory</h2>
        <div className='text-center'>
          <button className='border-2 border-white px-4 py-2 rounded-md text-white hover:bg-primary' onClick={handleSort}>New Game</button>
        </div>
    </main>
      <div className='grid grid-cols-4 gap-6 mt-16'>
        {cards.map((cardSingle) => (
            <Home 
            cardSingle={cardSingle} 
            key={cardSingle.id} 
            handleChoice={handleChoice}
            flipped={cardSingle === choiceOne || cardSingle === choiceTwo || cardSingle.matched}
            disabled={disabled}
            />
        ))}
      </div>
      <div className=''>
        <div className='mx-auto bg-primary text-white rounded-lg font-bold my-3 p-2 w-32 xl:mt-6'><span>Turns: </span>{turns}</div>
      </div>
    </div>
    
  );
}

export default App;