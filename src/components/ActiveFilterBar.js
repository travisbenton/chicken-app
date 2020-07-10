import React from 'react';
import { unCamel } from '../helpers/helpers'

export function ActiveFilterBar ({ activeFilters, clearFilters, filterUpdate }) {
	const filterKeys = Object.keys(activeFilters)
	const showClear = !!filterKeys.filter(key => activeFilters[key].length).length
	const removeFilter = filter => () => filterUpdate(filter)

  return (
    <ul className="activeFilterBar">
    	{filterKeys.map(key => {
    		if (!activeFilters[key].length) return null

    		return activeFilters[key].map(filter => {
	    		return (
	    			<li
	    				key={filter}
	    				className="activeFilter"
	    			>
		    			<div className="filterLabel">
		    				{unCamel(key)}: {filter}
		    			</div>
							<div
								className="removeFilter"
								onClick={
									removeFilter(`${key}|${filter}`)
								}
							>
								x
							</div>
		    		</li>
	    		)
    		})
    	})}
    	{showClear &&
    		<li
	    		className="activeFilter filterLabel clearLabel"
	    		onClick={clearFilters}
	    	>
	    		Clear Filters
	    	</li>
	    }
    </ul>
  )
}
