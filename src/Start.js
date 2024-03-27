import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Start(props) {
    React.useEffect(() => {
        Aos.init({duration: 2000})
        function stopPointer() {
            var windowHeight = window.innerHeight
            var element = document.querySelector(".instructions").getBoundingClientRect().top
            if (element < windowHeight - 200) {
                document.querySelector(".arrows").classList.add("active")
            }
        }
        window.addEventListener("scroll", stopPointer)
        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
          }
    }, [])
    return (
        <div className="start">
            <p className="main-title">Trivia Quiz</p>
            <p className="far">How far can you <span>go?</span></p>
            <button className="start-button" onClick={props.startQuiz}>Start</button>
            {props.record === false && <svg class="arrows">
				<path class="a1" d="M0 0 L30 30 L60 0"></path>
                <path class="a2" d="M0 80 L30 110 L60 80"></path>
                <path class="a3" d="M0 160 L30 190 L60 160"></path>
			</svg>}
            {props.record && <p className="prevLevel">Previous level reached: {props.level}</p>}
            <div data-aos="fade-up" className="instructions">
                <p>Intructions</p>
                <div className="list">
                    <ol type="1">
                        <li>For each level, there is a total of <span>10</span> questions.</li>
                        <li>Everyone starts from level <span>1</span>.</li>
                        <li>To ascend to the next level, your score must be above <span>0</span>.</li>
                        <li className="green">How to score points? By answering questions <span>correctly</span>.</li>
                        <ul>
                            <li className="green"><span>Easy</span> questions: +1 point</li>
                            <li className="yellow"><span>Medium</span> questions: +2 points</li>
                            <li className="red"><span>Hard</span> questions: +3 points</li>
                        </ul>
                        <li className="red">How are points deducted? By answering questions <span>wrongly</span>.</li>
                        <ul>
                            <li className="green"><span>Easy</span> questions: -3 point</li>
                            <li className="yellow"><span>Medium</span> questions: -2 points</li>
                            <li className="red"><span>Hard</span> questions: -1 points</li>
                        </ul>
                        <li>How to check the difficulty level of each question? <br/>By <span>hovering</span> the symbol at the top right of each question.</li>
                        <ul>
                            <li className="green"><img src="./images/easy.png"></img> This symbol represents <span>Easy</span> questions.</li>
                            <li className="yellow"><img src="./images/medium.png"></img> This symbol represents <span>Medium</span> questions.</li>
                            <li className="red"><img src="./images/hard.png"></img> This symbol represents <span>Hard</span> questions.</li>
                        </ul>
                    </ol>
                </div>
            </div>
            <footer className="footer">Created by <span>Sean Khoo</span> | Portfolio Project - 1</footer>
        </div>
    )
}