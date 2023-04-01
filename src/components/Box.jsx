import { useEffect, useState } from 'react'
import Card from './Card'
import {images} from './import'
import { TbReload } from 'react-icons/tb';

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
    <div className=''>
    {/* fail and new game */}
      <div className='flex flex-row justify-end items-end gap-3 pb-5 pr-5'>
        <h2 className='text-white text-5xl font-black w-full pl-5'>MEMO</h2>
        <div className='flex flex-col justify-center items-center'>
        <p className='w-full text-white font-black text-xs text-center'>failed:</p>
        <p className='text-black bg-white p-2 rounded-md h-[36px] w-[36px] flex justify-center items-center font-black text-xl'>{attempts}</p>
        </div>
        <button className='bg-white p-2 rounded-md text-xl'
        ><TbReload/></button>
      </div>

    {/* Cards */}
      <div className='border-[0.5rem] rounded-3xl bg-white border-white w-[700px] p-5 flex flex-wrap justify-center items-center'>
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

    {/* Sentences */}
    {/* <div className='text-white'>
      lass uns spielen!
    </div> */}

    </div>
  )
}

export default Box