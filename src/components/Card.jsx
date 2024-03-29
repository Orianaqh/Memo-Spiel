import React, { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import backFace from '../assets/images/back.png'

const Card = ({ name, number, frontFace, flipCard, unflippedCards, disabledCards}) => {

  const [isFlipped, setIsFlipped] = useState(false);
  const [hasEvent, setHasEvent] = useState(true);

  useEffect(() => {
    if(unflippedCards.includes(number)){
      setTimeout(()=> setIsFlipped(false), 700);
    }
  },[unflippedCards]);

  useEffect(() => {
    if(disabledCards.includes(number)){
      setHasEvent(false);
    }
  },[disabledCards]);

  const handleClick = e => {
    const value = flipCard(name, number);
    if(value !== 0){
      setIsFlipped(!isFlipped)
    }
  };

  return (
      <ReactCardFlip isFlipped={isFlipped}>
        <img
          onClick={hasEvent ? handleClick : null}
          className='m-[5px] h-[170px] w-[150px] cursor-pointer hover:scale-[0.97]
          transition duration-150 ease-out inline-block object-cover rounded-3xl'
          src={backFace} alt='back-face'/>
        <img
          onClick={hasEvent ? handleClick : null}
          className='m-[5px] h-[170px] w-[150px] cursor-pointer
          transition duration-150 ease-out inline-block object-cover rounded-3xl' 
          src={frontFace} alt='front-face'/>
      </ReactCardFlip>
  )
}

export default Card