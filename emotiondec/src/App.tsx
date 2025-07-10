// App.tsx

import './App.css';
import EmojisList from './components/Emojislist';

const App = () => {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Emotion Reflection Tool</h1>
      </header>
      <main className="p-4">
        <EmojisList />
      </main>
    </div>
  );
};

export default App;
