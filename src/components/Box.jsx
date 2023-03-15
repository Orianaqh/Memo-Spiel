import { useEffect, useState } from 'react'
import Card from './Card'
import {images} from './import'

const Box = () => {

  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});
  const [unflippedCards, setUnflippedCards] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);
  const [attempts, setAttempts] = useState(0);

  {/*RANDOM CARDS */}
  const shuffleArray = (array) => {
    for(let i = array.length -1; i > 0; i--){
      let j = Math.floor(Math.random()*(i+1));
      let temp = array[i];
      array[i]= array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    shuffleArray(images);
    setCards(images);
  },[]);

  useEffect(()=> {
    checkForMatch();
  },[secondCard]);

  {/*FLIP CARDS */}
  const flipCard = (name, number) => {
    if(firstCard.name === name && firstCard.number === number){
      return 0;
    }
    if(!firstCard.name){
      setFirstCard({name, number})
    }
    else if(!secondCard.name){
      setSecondCard({name, number})
    }
    return 1;
  };

  {/* CHECK for MATCH */}
  const checkForMatch = () =>  {
    if(firstCard.name && secondCard.name){
      // const match = firstCard.name === secondCard.name;
      // match ? disableCards() : unflipCards()
      if(firstCard.name === secondCard.name){
        disableCards()
      } else {
        unflipCards()
        setAttempts(attempts + 1)
      }
    }
  };

  const resetCards = () => {
    setFirstCard({});
    setSecondCard({});
  };

  const disableCards = () => {
    setDisabledCards([firstCard.number, secondCard.number]);
    resetCards();
  };

  const unflipCards = () => {
    setUnflippedCards([firstCard.number, secondCard.number]);
    resetCards();
  };

  return (
    <div className='flex-col flex justify-center items-center'>
      <p>failed attempts: {attempts}</p>

      <div className='border-2 border-black w-[57%] h-min-screen flex flex-wrap justify-center items-center'>
      {
        cards.map((card, index) => (
          <Card
            name={card.name}
            frontFace={card.img}
            key={index}
            number={index}
            flipCard={flipCard}
            unflippedCards={unflippedCards}
            disabledCards={disabledCards}
            />
        ))
      }
      </div>
{/* 
      <button
        onClick={}
      >new game</button> */}
    </div>
  )
}

export default Box