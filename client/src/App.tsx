/* import { Counter } from './features/counter/Counter'; */
import { RouterProvider } from 'react-router-dom';
import router from './app/router';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <Counter />
        
      </header> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
