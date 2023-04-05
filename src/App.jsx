import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Quiz from "../components/Quiz"
import first from "../public/blob 5.png"
import second from "../public/blob 5 (1).png"

function App() {
  // saving the data fetched into states
  const [quizArr, setQuizArr] = useState([])
  const [questions, setQuestions] = useState([])
  const [quizDone, setQuizDone] = useState(false)
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0)
// fetching the data and setting the states
  useEffect(()=>{
    if(quizArr.length === 0){
      fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
      .then(res=>res.json())
      .then(data=>{
        setQuizArr(data.results)
        setQuestions(
          data.results.map(item=>{
            return {
              Id: nanoid(),
              question: item.question,
              answers: shuffle([...item.incorrect_answers, item.correct_answer]),
              correctAnswer: item.correct_answer,
              selectedAnswer: ""
            }
          })
        )
      })
    }
  }, [quizArr])

  useEffect(()=>{
    let count = 0;
     questions.map((item)=>{
      item.correctAnswer === item.selectedAnswer ? count += 1 : count
    })
    setNumCorrectAnswers(count)
  },[quizDone])

  //choosing an answer
  function answerQuestion(answer, id){
    setQuestions(
      questions.map(item=>{
        if(item.Id === id){
          return {...item, selectedAnswer: answer}
        }else{
          return item
        }
      })
    )
  }
  // checking answers
  function checkAnswers(){
    if(!quizDone){
      setQuizDone(true)
    }else{
      setQuizDone(false)
      setQuizArr([])
      setQuestions([])
    }
  }
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  return (
   <main>
    <img src={first} alt="#" className='first' />
     <Quiz 
      Quiz={questions}
      answerQuestion={answerQuestion}
      quizDone={quizDone}
    />
    <div className="bottom">
    {quizDone && <p>You scored {numCorrectAnswers}/5 correct answers</p>}
    <button className="check-answer" onClick={checkAnswers}>{quizDone ? "Play again" : "Check answers"}</button>
    </div>
    <img src={second} alt="#" className='second' />
   </main>
  )
}

export default App
