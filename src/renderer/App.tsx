/* eslint-disable prettier/prettier */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import Shell from './Shell';
import './App.css';

function Hello() {
  return (
    <SimpleBar
      style={{
        maxHeight: "100vh"
      }}>
      <MantineProvider
        theme={{
          fontFamily: 'Helvetica',
        }}
      >
        <ModalsProvider>
          <Shell />
        </ModalsProvider>
      </MantineProvider>
    </SimpleBar>
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
