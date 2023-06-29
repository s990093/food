import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import { SessionController } from './lib/NativeJs/session';
import { Fetch } from './lib/NativeJs/fetch';

function App() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            console.log('tiggeer interval');
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="App">
            <Container>
                <Row className="mt-4">
                    <Col>
                        <h1>Admin Dashboard</h1>
                        <p>Welcome to the admin interface. Manage your application here.</p>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <div className="clock">
                            <p>Current time: {time.toLocaleTimeString()}</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <Button variant="primary" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                            Learn React
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
