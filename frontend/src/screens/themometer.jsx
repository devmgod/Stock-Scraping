import Thermometer from '../components/themometer';

function App() {
  const markers = [
    { label: 'Apple', percentage: 15, side: 'left' },
    { label: 'IBM', percentage: 45, side: 'right' }
  ];

  return (
    <div className="App">
      <Thermometer level="high" markers={markers} />
    </div>
  );
}

export default App;
