import React from "react";
import { nanoid } from "nanoid";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Quiz(props) {
    React.useEffect(() => {
        Aos.init({duration: 2000})
    }, [])
    const [showDiff, setShowDiff] = React.useState(false)
    const [showWarning, setShowWarning] = React.useState(false)
    const level = props.level[0].toUpperCase() + props.level.slice(1)
    const styles = {color: level === "Easy" ? "#5FF7AE" : level === "Medium" ? "#E5EC2D" : "red"}
    const quesObj = {
        "&quot;": '"',
        "&#039;": "'",
        "&deg;": "°"
    }
    const ques = props.ques.replace(/&quot;|&#039;|&deg;/g, match => {
        return quesObj[match]
    })
    const correct = props.correct.replace(/&quot;|&#039;|&deg;/g, match => {
        return quesObj[match]
    })
    const wrong = props.wrong.map(x => {
        return x.replace(/&quot;|&#039;|&deg;/g,  match => {
            return quesObj[match]
        })
    })
    function getAns() {
        let array = [{value: correct, sort: Math.random(), isChosen: false, id: nanoid()}]
        for (let i = 0; i < props.wrong.length; i++) {
            array.push({
                value: wrong[i],
                sort: Math.random(),
                isChosen: false,
                id: nanoid(),
            })
        }
        return props.type === "boolean" ? array.sort((a, b) => b.value.localeCompare(a.value)) :
            array.sort((a, b) => a.sort - b.sort) 
    }
    const [answers, setAnswers] = React.useState(getAns)
    React.useEffect(() => {
        return setAnswers(getAns)
    }, [props.correct])
    function selectAns(id) {
        setAnswers(prevAns => {
            return prevAns.map(x => {
                return x.id === id ? {...x, isChosen: !x.isChosen} : {...x, isChosen: false}
            })
        })
    }
    const finalAns = answers?.map(x => 
        <div 
            className="ans"
            onClick={() => 
                {props.submit === false && selectAns(x.id); x.isChosen 
                    ? props.submit === false && props.isNotSubmitted(props.id) :
                    props.submit === false && props.isSubmitted(props.id, x.value)} 
            }
            style={
                {backgroundColor: 
                    props.submit && x.value === correct ? "green" : 
                    props.submit && x.isChosen ? "red" : 
                    x.isChosen ? "blue" : "#fff"}
            }
            >{x.value}
        </div>
    )
    return (
        <div data-aos="fade-up" className="quiz" id={props.submitted === false && "here"}>
            <div className="quiz-container">
                <div className="first-line">
                    {props.submit && <p className="point" style={{color: props.point > 0 ? "green" : "red"}}>Points {props.point > 0 && "+"}{props.point}</p>}
                    {(props.submitted === false && props.warning) 
                        && <img src="./images/warning.png" 
                                className="warning"
                                onMouseEnter={() => setShowWarning(true)}
                                onMouseLeave={() => setShowWarning(false)}>
                            </img>}
                    {showWarning && 
                        <div className="warningText">
                            <p>Select <span>one</span> answer.</p>    
                        </div>
                    }
                    <p className="index">Question {props.index}</p>
                    <img src={`./images/${props.level}.png`}
                        className="fire" 
                        onMouseEnter={() => setShowDiff(true)}
                        onMouseLeave={() => setShowDiff(false)}>
                    </img>
                    {showDiff && 
                        <div className="difficulty">
                            <p>Difficulty: <span style={styles}>{level}</span></p>
                        </div>
                    }
                </div>
                <p className="category">{props.category}</p>
                <p className="question">{ques}</p>
                <div className="answer">
                    {finalAns}
                </div>
            </div>
        </div>
    )
}