// import { Filter } from '../../models/interfaces';
// import react


import { ReactNode } from 'react';
import './spinnerStyles.css';
interface Props{
  children:ReactNode,
  show:boolean
}
function Spinner({children,show}:Props):JSX.Element{
  
  const toRender = 
  show?
  <div className="d-flex justify-content-center align-items-center">
    <div className="spinner-border text-primary spinner-border-sm"
      role="status">
    </div>
  </div>
  :children

  return (
    <>
      {toRender}
    </>
  )

}

 export default Spinner;