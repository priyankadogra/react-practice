import SelectableArea from './SelectableArea';

const text = " The quick brown fox jumps over the lazy dog. It was a bright cold day in April.";

function App() {
  return (
    <>
      <h1>Data Table</h1>
      <SelectableArea text={text} />
    </>
  )
}

export default App
