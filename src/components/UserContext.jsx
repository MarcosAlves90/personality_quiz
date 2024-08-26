import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext(undefined);

export function UserProvider({ children }) {
    const [name, setName] = useState(sessionStorage.getItem('userName'));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    return (
        <UserContext.Provider value={{ name, setName, currentQuestionIndex, setCurrentQuestionIndex, answers, setAnswers }}>
            {children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};