import React from "react"
import { useGLobalContext } from "./Context"
 const Modal=()=>{
   const {modal,CloseModal,correct,Question}=useGLobalContext();
   return(
     <div className={`${modal ? " modal-container isOpen": "modal-container" }`}>
       <div className="modal-content">
         <h2>Congratulations </h2>
         <p>You answered {((correct/Question.length)*100).toFixed(0)} % of question Correctly</p>
         <button className="close-btn" onClick={CloseModal}>
           Play Again
         </button>
       </div>
  
     </div>
   )
 }
 export default Modal