import Header from '../components/Header';
import Home from '../components/Home';

function App() {
  return (
    <div 
      style={{
        margin: `0 auto`, 
        maxWidth: 1040,
        padding: `0 1.0875rem 1.45rem`, 
      }}
      >
        <Header />
        <Home />
    </div>
  );
}

export default App;
