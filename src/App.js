import React from "react"
import { useGLobalContext } from "./Component/Context"
import SetupForm from "./Component/SetupForm"
import Loader from "./Component/Loader";
import Modal from "./Component/Modal";
 const App=()=>{
   const {waiting,
    Loading,
    Question,
    index,
    correct,
  nextQuestion,
  CheckAnswer
}=useGLobalContext();
    if(waiting)
    {
      return<SetupForm/>
    }
 if(Loading)
 {
   return <Loader/>
 }
 const { question, incorrect_answers, correct_answer } = Question[index];
let answers=[...incorrect_answers]
const Temp=Math.floor(Math.random()*4);
if(Temp===3)
{
  answers.push(correct_answer);
}
else
{
  answers.push(answers[Temp])
  answers[Temp]=correct_answer;
}
 return (
   <main>
     <Modal/>
     <section className="quiz">
       <p className="correct-answers">correct answer:{correct}/{index}</p>
       <article  className="container">
    <h2 dangerouslySetInnerHTML={{__html:question}}/>
    <div className="btn-container">
      {answers.map((answer,index)=>{
        return (
          <button key={index} className="answer-btn"
          onClick={()=>CheckAnswer(correct_answer===answer)}
           dangerouslySetInnerHTML={{__html:answer}}/>
        )
      })}
    </div>
       </article>
       <button className="next-question" onClick={nextQuestion}>Next Question</button>
     </section>
     </main>
 )
 }
 export default App