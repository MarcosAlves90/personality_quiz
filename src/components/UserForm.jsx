import { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
    const [inputName, setInputName] = useState('');
    const { setName } = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();
        sessionStorage.setItem('userName', inputName);
        setName(inputName);
        window.history.pushState({}, '', '/personality_quiz/quiz');
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);  // Dispatch a navigation event
    }

    return (
        <form>
            <input
                type={"text"}
                id={"name"}
                placeholder={"Enter your name"}
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                required
            />
            <button type={"submit"} onClick={inputName ? handleSubmit : null}>Start Quiz</button>
        </form>
    )
}