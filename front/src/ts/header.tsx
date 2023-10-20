import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Auth from './auth';

const callBackURI:string='http://localhost:3000/auth/github'
const GITHUB_CLIENT_ID:string=import.meta.env.VITE_TODO_GITHUB_ID;

export default function Header(){
    return(
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href='/'>Navbar with text</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <a href={'https://github.com/login/oauth/authorize?client_id='+GITHUB_CLIENT_ID+'&redirect_uri='+callBackURI}>ログイン</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}