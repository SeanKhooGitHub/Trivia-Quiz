import React from "react";
import { nanoid } from "nanoid";
import Quiz from "./Quiz";
import Start from "./Start";

export default function App() {
    const [start, setStart] = React.useState(false)
    const [level, setLevel] = React.useState(1)
    const [question, setQuestion] = React.useState("")
    const [newGame, setNewGame] = React.useState(false)
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10")
            .then(res => res.json())
            .then(data => setQuestion(data))
    }, [newGame])
    const [quiz, setQuiz] = React.useState()
    const [points, setPoints] = React.useState()
    const [record, setRecord] = React.useState(false)
    React.useEffect(() => {
        setQuiz(question.results?.map(x => {
            return {...x, id: nanoid(), submitted: false, warning: false, point: 0, submit: false}
        }))
    }, [question])
    const array = quiz?.map((x, index) => {
        return (
        <Quiz
            index={index+1}
            category={x.category}
            level = {x.difficulty}
            ques = {x.question}
            correct = {x.correct_answer}
            wrong = {x.incorrect_answers}
            type = {x.type}
            id ={x.id}
            submitted = {x.submitted}
            submit = {x.submit}
            isSubmitted = {isSubmitted}
            isNotSubmitted = {isNotSubmitted}
            warning = {x.warning}
            point = {x.point}
        />
    )}
    )
    function isSubmitted(id, value) {
        setQuiz(prevQuiz => {
            return prevQuiz.map(x => {
                return x.id === id ? {...x, submitted: true} : x
            })
        })
        setQuiz(prevQuiz => {
            return prevQuiz.map(x => {
                return x.id === id ? x.correct_answer === value ? 
                {...x, point: x.difficulty === "easy" ? 1 : x.difficulty === "medium" ? 2 : 3} 
                : {...x, point: x.difficulty === "easy" ? -3 : x.difficulty === "medium" ? -2 : -1}
                : x
            })
        })
    }
    function isNotSubmitted(id) {
        setQuiz(prevQuiz => {
            return prevQuiz.map(x => {
                return x.id === id ? {...x, submitted: false} : x
            })
        })
    }
    function submitIt() {
        setQuiz(prevQuiz => {
            return prevQuiz.map(x => {
                return {...x, submit: true}
            })
        })
        setPoints(quiz?.map(x => x.point))
    }
    function setWarning() {
        setQuiz(prevQuiz => {
            return prevQuiz.map(x => {
                return {...x, warning: true}
            })
        })
    }
    function playAgain() {
        setNewGame(prevNewGame => !prevNewGame)
        if (points?.reduce((a, b) => a + b) > 0) {
            setLevel(prevLevel => prevLevel + 1)
        } else {
            setStart(false)
            setRecord(true)
            window.scrollTo(0, 0)
        }
    }
    function startQuiz() {
        setLevel(1)
        setStart(true)
    }
    return (
        start
        ?
        <div className="main">
            <p className="title" id="refresh">Trivia Quiz: <span>Level {level}</span></p>
            {array}
            {quiz?.[0].submit && <p className="score">Total Score: {points?.reduce((a, b) => a + b)}</p>}
            {quiz?.[0].submit && <p className="msg">{points?.reduce((a, b) => a + b) > 0 ? "You survived! On to the next level." : "You lost! Better luck next time."}</p>}
            {quiz?.[0].submit === false && <a href="#here" className="submit" onClick={quiz?.every(x => x.submitted) ? submitIt : setWarning}>Submit</a>}
            {quiz?.[0].submit && <a href="javascript:setTimeout(() => {window.location = '#refresh'}, 1000)" className="submit" onClick={playAgain}>{points?.reduce((a, b) => a + b) > 0 ? "Next level" : "Main Menu"}</a>}
            <footer className="footer">Created by <span>Sean Khoo</span> |  Portfolio Project - 1</footer>
        </div>
        :
        <Start startQuiz={startQuiz} level={level} record={record}/>
    )
}