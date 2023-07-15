import { ReactNode } from 'react';
import './spinnerStyles.css';
interface Props{
  children:ReactNode,
  show:boolean
}
function Spinner():JSX.Element{
  return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary spinner-border-sm"
          role="status">
        </div>
      </div>  
  )

}

 export default Spinner;