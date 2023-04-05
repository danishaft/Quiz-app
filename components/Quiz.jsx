
function Quiz(props){
    const quizElem = props.Quiz.map((item)=>{
        return <article className="quiz" key={item.Id}>
            <h3>{item.question}</h3>
            <div className="answers">
                {item.answers.map((answer, index) =>{
                    return <button
                    disabled={props.quizDone} 
                    className={`answer ${answer === item.selectedAnswer && "active"}
                     ${answer === item.correctAnswer && props.quizDone && "correct"}
                     ${answer !== item.correctAnswer && props.quizDone && "dim"}
                     ${answer === item.selectedAnswer && answer !== item.correctAnswer && props.quizDone && "wrong"}
                     `} 
                    key={index} 
                    onClick={()=>props.answerQuestion(answer, item.Id)}>{answer}
                    </button>
                })}
            </div>
        </article>
    })
    return(
        <div className="quiz-container">
            {quizElem}
        </div>
    )
}
export default Quiz 