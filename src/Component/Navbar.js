import { Navbar } from "react-bootstrap";
import './Navbar.css'

export function NavbarPage() {

    return (
        <>
        {/* navbar HTML code */}
            <Navbar bg="danger" expand="lg">
                <Navbar.Brand className="nav-title text-light" href="#home">ToDo App</Navbar.Brand>
            </Navbar>

        </>
    )
}