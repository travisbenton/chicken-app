import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data/chicken-stats.json'
import { FilterBar, FilterIcon } from './components/FilterBar'
import { ActiveFilterBar } from './components/ActiveFilterBar'
import { ChickPic } from './components/ChickPic'
import { ChickenModal } from './components/ChickenModal'
import { filterChickens } from './helpers/helpers'
import emptyGif from './pictures/empty.gif'

function App() {
  const [activeFilters, setFilter] = useState({})
  const [menuOpened, setMenuOpen] = useState(false)
  const [modalDetails, setModalDetails] = useState({})
  const filteredChickens = filterChickens(data, activeFilters);

  const onCloseModalClick = () => setModalDetails({})

  const openChickenPage = ({ currentTarget: { dataset } }) => {
    const breedInfo = filteredChickens.filter(item => item.breed === dataset.breed)[0]
    setModalDetails(breedInfo)
  }

  const clearFilters = () => {
    setFilter({})
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  const filterUpdate = filter => {
    const [key, value] = filter.split('|')
    const thisFilter = activeFilters[key];

    if (thisFilter && thisFilter.includes(value)) {
      setFilter({
        ...activeFilters,
        [key]: thisFilter.filter(prop => prop !== value)
      })
    } else {
      setFilter({
        ...activeFilters,
        [key]: thisFilter ? thisFilter.concat(value) : [value]
      })
    }
  }
  const toggleMenu = (newState = null) => {
    setMenuOpen(newState !== null ? newState : !menuOpened)
  }
  const onDocumentClick = evt => {
    if (!evt.target.closest('.filterBar')) {
      toggleMenu(false)
    }
  }
  useEffect(() => {
    document.body.addEventListener('click', onDocumentClick)
    return () => document.body.removeEventListener('click', onDocumentClick)
  }, [])

  return (
    <div className="app">
      <nav className="mainNav">
        <FilterIcon
          toggleMenu={toggleMenu}
        />
        <ActiveFilterBar
          clearFilters={clearFilters}
          activeFilters={activeFilters}
          filterUpdate={filterUpdate}
        />
      </nav>
      <FilterBar
        activeFilters={activeFilters}
        toggleMenu={toggleMenu}
        open={menuOpened}
        data={data}
        filterUpdate={filterUpdate}
        clearFilters={clearFilters}
      />
      <div className="chickens">
        {!filteredChickens.length &&
          <section className="empty">
            <h1>nah.</h1>
            <img src={emptyGif} />
          </section>
        }
        {filteredChickens.map(chicken =>
          <ChickPic
            onChickPicClick={openChickenPage}
            chicken={chicken}
            key={chicken.breed}
          />
        )}
      </div>
      <ChickenModal
        onCloseClick={onCloseModalClick}
        chickenDetails={modalDetails}
        show={Object.keys(modalDetails).length}
      />
    </div>
  );
}

export default App;
