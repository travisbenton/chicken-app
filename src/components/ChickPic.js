import React from 'react';

export function ChickPic ({ chicken, onChickPicClick }) {
  const pic = chicken.images.length
    ? chicken.images[0]
    : 'https://placehold.it/600x400?text=chicken'

  return (
    <section
      className="card"
      data-breed={chicken.breed}
      onClick={onChickPicClick}
    >
      <h1>{chicken.breed}</h1>
      <div
        className="img" 
        style={{backgroundImage: `url(${pic})`}}
      />
    </section>
  )
}