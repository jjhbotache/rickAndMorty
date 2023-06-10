import "./filter.css"

interface Props{
  featuresToFilter: any
}

export default function Filter({featuresToFilter}:Props) {

    

    return (
      <div className="dropdown open" >
        <button style={{ backgroundColor: "rgba(0,0,0,0)" }} className="btn btn-sm btn-secondary dropdown-toggle border-0" type="button" id="filter-options" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
              <h5 style={{display:"inline"}}>Filtrar &nbsp;</h5>
              <i className="fi fi-rr-settings-sliders"></i>
        </button>

        <div className="dropdown-menu bg-dark" aria-labelledby="filter-options">
          {
            featuresToFilter.map((feature:any)=>{
              return <button key={feature.name} className="dropdown-item text-light" onClick={()=>{alert(feature.function)}}>{feature.name}</button>
            }
            )
          }
        </div>

      </div>
    );
};
