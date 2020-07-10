import React from 'react';
import { unCamel } from '../helpers/helpers'

export function ChickenModal ({ chickenDetails, show, onCloseClick }) {
  const {
    breed,
    description,
    images,
    ...rest
  } = chickenDetails

  return (
    <section className={`chickenModal ${show ? 'show' : ''}`}>
      <div className="modalClose" onClick={onCloseClick}>X</div>
      <div className='modalDetails'>
        <h1>{breed}</h1>
        <img src={images && images[0]} />
        <p>{description}</p>
        <ul>
          {Object.keys(rest).map(attr =>
            <li key={attr}>
              {unCamel(attr)}: {chickenDetails[attr]}
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}