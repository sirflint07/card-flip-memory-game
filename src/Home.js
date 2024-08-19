import React from 'react';

function Home({cardSingle, handleChoice, flipped, disabled}) {
  const handleClick = () => {
    if (!disabled) {
        handleChoice(cardSingle)
    }
  }
  
  return (
      <div className='relative hover:opacity-80'>
        <div className={flipped? 'flipped' : ''}>
            <img src={cardSingle.src} alt='front' className='block w-full xl:w-36 border-2 border-white rounded-sm absolute front'/>
            <img src='/img/cover.png' alt='back' className='block w-full xl:w-36 border-2 border-white rounded-sm mt-0 back' onClick={handleClick}/>
        </div>     
      </div>
  )
}

export default Home;
