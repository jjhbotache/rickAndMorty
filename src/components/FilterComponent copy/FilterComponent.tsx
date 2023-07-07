import React from "react"
import { Filter } from '../../models/interfaces';
import './FilterComponent.css';

interface FilterProps{
  onFilterFunction:(newfilter: Filter) => void,
  toFilter:{
    filterName:string,
    subFilter:string[]
  }[]
}

function FilterComponent({onFilterFunction,toFilter}:FilterProps):JSX.Element{

  // convert the first letter of a string to uppercase
  function capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return(
  <>
  {/* search bar */}
  <input type="text" className="form-control " placeholder="Search" 
  onChange={(e)=>{onFilterFunction({name:e.target.value})}}
  />
  {/* filters */}
  <div className="btn-group my-2">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="filterElementId" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
              <i className="fi fi-rr-settings-sliders"></i>
        </button>
        <div className="dropdown-menu dropdown-menu-dark p-0" aria-labelledby="filterElementId">
          {
            toFilter.map((item)=>{
              return (
                <div className="col" key={item.filterName}>
                  <select className="form-control" onChange={(e)=>{onFilterFunction({[item.filterName]:e.target.value})}} >
                    <option value="">All {capitalizeFirstLetter(item.filterName)}</option>
                    {item.subFilter.map(element=><option value={element} key={element}>{capitalizeFirstLetter(element)}</option>)}
                  </select>
                </div>
              )
            }
            )
          }         
        </div>
  </div>

  
  </>
  )
}

 export default FilterComponent;