import Image from "./image/Image";
import FormContainer from "./forms/FormContainer";

const text = "The quick brown fox jumps over the lazy dog. It was a bright cold day in April.";
const src="https://img.magnific.com/free-photo/closeup-shot-beautiful-ginger-domestic-kitten-sitting-white-surface_181624-35913.jpg?t=st=1793671442~exp=1793675042~hmac=d854d38b375889dc95425fbf79c30c4b959b79fd896f24a439501a7eea2e67787&w=2000sakd";

function App() {
  return (
    <>
      <h1>Search</h1>
      <FormContainer/>
      {/* <Image src={src}
        width={528} height={528} alt="Cat Image"
      /> */}
      {/* <Spreadsheet cols={5} rows={5} /> */}
      {/* <SelectableArea text={text} /> */}
    </>
  )
}

export default App
