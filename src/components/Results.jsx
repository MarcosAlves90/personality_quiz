import PropTypes from "prop-types";
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";

export default function Results({ element, artwork }) {

    const { name } = useContext(UserContext);
    const { setCurrentQuestionIndex } = useContext(UserContext);
    const { setAnswers } = useContext(UserContext);

    function Restart() {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        window.history.pushState({}, '', '/personality_quiz/');
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return (
        <article>
            <div className={"display-flex-center results-text"}>
                <p>
                    <strong>{name ? name : "Undefined"}</strong>, you are a {element}
                </p>
                <button className={"restart-button"} onClick={Restart}>
                    Restart
                </button>
            </div>
            {artwork ? (
                <div className="artwork">
                    <img className={"dog-image"} src={artwork.message}  alt={`Picture of a ${element}`}/>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </article>
    );
}

Results.propTypes = {
    element: PropTypes.string.isRequired,
    artwork: PropTypes.object,
}