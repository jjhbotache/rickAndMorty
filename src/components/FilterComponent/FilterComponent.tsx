import { Filter } from '../../models/interfaces';
import './FilterComponent.css';
interface FilterProps{
  onFilterFunction:void,
  filter:Filter
}
function FilterComponent({onFilterFunction,filter}:FilterProps):JSX.Element{
  return(
  <>
  {/* search bar */}
  <input type="text" className="form-control " placeholder="Search" 
  onChange={(e)=>{onFilterFunction({name:e.target.value})}}
  />
  {/* filters */}
  <div className="btn-group my-2">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
              <i className="fi fi-rr-settings-sliders"></i>
        </button>
        <div className="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
          <div className="col">
            <select id="statusFilter" className="form-control" 
            onChange={(e)=>{onFilterFunction({status: e.target.value})}}
            >
              <option value="">All Statuses</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="col">
            <select id="speciesFilter" className="form-control" 
            onChange={(e)=>{onFilterFunction({species:e.target.value})}}
            >
              <option value="">All Species</option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
              
            </select>
          </div>
          <div className="col">
            <select id="genderFilter" className="form-control" 
            onChange={(e)=>{onFilterFunction({gender:e.target.value})}}
            >
              <option value="">All Genders</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
  </div>

  
  </>
  )
}

 export default FilterComponent;