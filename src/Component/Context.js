import React, { useContext,  useState } from "react"
import axios from "axios"
const table = {
    sports: 21,
    history: 23,
    politics: 24,
  }

const API_ENDPOINT = 'https://opentdb.com/api.php?'

 const AppContext=React.createContext();

 const AppProvider=({children})=>{
     const [waiting,setWating]=useState(true);
     const [Loading,setLoading]=useState(false);
     const [Question,setQuestion]=useState([]);
     const [index,setIndex]=useState(0);
     const [correct,setCorrect]=useState(0);
     const [Error,setError]=useState(false);
     const [modal,setModal]=useState(false);
     const [quiz, setQuiz] = useState({
        amount: 10,
        category: 'sports',
        difficulty: 'easy',
      })
     const fetchQuestion =async(url)=>{
         setLoading(true);
         setWating(false);
const response = await axios(url).catch((err)=>console.log(err));
if(response)
{
const data=response.data.results
if(data.length>0)
{
    setQuestion(data);
    setLoading(false);
    setWating(false);
    setError(false);
}else{
    setWating(true);
    setError(true);
}}
else
{
    setWating(true);
}
}
const nextQuestion=()=>{
    setIndex((oldIndex)=>{
  const index = oldIndex+1;
  if(index>Question.length-1)
  {
      openModal();
      return 0
  }else
  {
    return index
  }
    })
}
 const CheckAnswer =(value)=>{
     if(value)
     {
         setCorrect((old)=>old+1)
     }
     nextQuestion();
 }

 const openModal=()=>{
     setModal(true);
 }
  const CloseModal =()=>{
    setWating(true);
    setCorrect(0);
      setModal(false);
     

  }
  const handleChange=(e)=>{
      const name=e.target.name;
      const value=e.target.value;
      setQuiz({...quiz,[name]:value})
  }
  const handleSubmit=(e)=>{
      e.preventDefault();
      const {amount,category,difficulty}=quiz
      const url=`${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
      fetchQuestion(url);
  }
     return(
         <AppContext.Provider value={{
             waiting,
             Loading,
             Question,
             index,
             correct,
             Error,
             modal,
             nextQuestion,
             CheckAnswer,
             CloseModal,
             quiz,
             handleChange,
             handleSubmit
         }}>
             {children}
             </AppContext.Provider>
     )
 }
 export const useGLobalContext=()=>{
     return useContext(AppContext)
 }
 export {AppContext,AppProvider}