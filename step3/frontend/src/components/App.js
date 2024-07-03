import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return <h1>Testing React Code</h1>;
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);

export default App;

