import Search from "./search/Search";

const text = "The quick brown fox jumps over the lazy dog. It was a bright cold day in April.";

function App() {
  return (
    <>
      <h1>Search</h1>
      <Search/>
      {/* <Spreadsheet cols={5} rows={5} /> */}
      {/* <SelectableArea text={text} /> */}
    </>
  )
}

export default App
