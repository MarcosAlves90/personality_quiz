import {Link} from "react-router-dom";

export default function Header() {

    return (
        <header>
            <h1>Which Dog Are You?</h1>
            <p>(based on completely random things)</p>
            <nav className={"nav-bar"}>
                <p className={"p-scale"}>
                    <Link className={"nav-link"} to="/personality_quiz/">Home</Link>
                </p>
                <p className={"p-scale"}>
                    <Link className={"nav-link"} to="/personality_quiz/about">About</Link>
                </p>
            </nav>
        </header>
    )

}