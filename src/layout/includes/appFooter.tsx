// File: ../components/AppFooter.js
import React from 'react';
import { Container } from 'react-bootstrap';
import './appFooter.css'; // Import your CSS for styling

const AppFooter = () => {
    return (
        <footer className="app-footer bg-dark text-white">
            <Container fluid className="py-3 text-center">
                <p className="mb-0">© 2024 Royz. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default AppFooter;
