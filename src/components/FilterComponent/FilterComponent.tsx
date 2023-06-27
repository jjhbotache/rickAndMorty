import { Filter } from '../../models/interfaces';
import './FilterComponent.css';
interface toFilterInterface{
  [key:string]:string[],
}
interface FilterProps{
  onFilterFunction:(newfilter: Filter) => void,
  toFilter:toFilterInterface
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
            Object.keys(toFilter).map((key)=>{
              return (
                <div className="col" key={key}>
                  <select className="form-control" onChange={(e)=>{onFilterFunction({[key]:e.target.value})}} >
                    <option value="">All {capitalizeFirstLetter(key)}</option>
                    {toFilter[key].map(element=><option value={element} key={element}>{capitalizeFirstLetter(element)}</option>)}
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