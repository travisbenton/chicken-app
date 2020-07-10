import React from 'react';
import { unCamel } from '../helpers/helpers'

// don't filter on these keys
const keyBlacklist = ['breed', 'description', 'images', 'varieties', 'personality']
const selectOptions = data => {
  const obj = {}

  data.forEach(chicken => {
    Object.keys(chicken).forEach(key => {
      if (keyBlacklist.includes(key)) return

      obj[key]
        ? obj[key].add(chicken[key])
        : obj[key] = new Set([chicken[key]])
    })
  })

  return obj
}

export function FilterBar ({
  data,
  activeFilters,
  open,
  filterUpdate,
  clearFilters,
  toggleMenu
}) {
  const opts = selectOptions(data)
  const selectChange = ({ target: { value } }) => filterUpdate(value)
  const closeFilterBar = () => toggleMenu(false)

  return (
    <section className={`filterBar ${open ? 'active' : ''}`} id="filterBar">
      <div
        onClick={closeFilterBar}
        className='closeIcon'
      >
        X
      </div>
      <h1>Filters</h1>
      {Object.keys(opts).map(key => (
          <section key={key} className="selectContainer">
            {unCamel(key)}:
            <select key={key} onChange={selectChange}>
              <option value={`${key}|false`}>No Preference</option>
              {[...opts[key]].map(opt =>
                <option key={`${key}|${opt}`} value={`${key}|${opt}`}>{opt}</option>
              )}
            </select>
          </section>
        )
      )}
      <button
        className="clearBtn"
        onClick={clearFilters}
      >
        clear filters
      </button>
    </section>
  )
}

export function FilterIcon ({ toggleMenu }) {
  return (
    <div
      className={'filterIcon'}
      onClick={toggleMenu}
    >
      ☰
    </div>
  )
}