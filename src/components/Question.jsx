import PropTypes from "prop-types";
import {useContext, useEffect} from "react";
import {UserContext} from "./UserContext.jsx";

export default function Question({ question, options, onAnswer }) {

    const { name } = useContext(UserContext);

    useEffect(() => {
        if (name === null) {
            window.history.pushState({}, '', '/');
            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent);
        }
    }, [name]);

    return (
        <div>
            <h2 className={"h2-question"}>{question}</h2>
            <div className={"question-buttons"}>
                {options.map(function (option) {
                    return (
                        <button
                            className={"question-button"}
                            key={option}
                            onClick={function () {
                                onAnswer(option);
                            }}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAnswer: PropTypes.func.isRequired,
};