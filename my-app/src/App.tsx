import React from 'react';
import AddQA from './features/qa/AddQA';
import ShowQA from './features/qa/ShowQA';
import './App.scss'

function App() {
    return (
        <div className="app">
            <h1 className="app_title">The Awesome Q And A Tool</h1>
            <AddQA />
            <ShowQA />
        </div>
    );
}

export default App;
