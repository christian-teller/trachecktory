/* eslint-disable prettier/prettier */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Shell from './Shell';
import './App.css';

function Hello() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Helvetica',
      }}
    >
      <Shell />
    </MantineProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
