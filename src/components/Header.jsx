import {Link} from "react-router-dom";

export default function Header() {

    return (
        <header>
            <h1>Which Dog Are You?</h1>
            <p>(based on completely random things)</p>
            <nav className={"nav-bar"}>
                <p className={"p-scale"}>
                    <Link className={"nav-link"} to="/">Home</Link>
                </p>
                <p className={"p-scale"}>
                    <Link className={"nav-link"} to="/about">About</Link>
                </p>
            </nav>
        </header>
    )

}