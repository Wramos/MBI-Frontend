import React, {useState} from 'react'
import './App.css';

function App() {

  const [generatedMbiId, setGeneratedMbi] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [verifyMbiInput, setVerifyMbiInput] = useState("")

  function generateMBI()
  {
    fetch('http://localhost:5000/generate', {
      mode: 'cors',
      method: 'GET'
    })
    .then( results => results.json() )
    .then( data => setGeneratedMbi(data))
    .catch( function(error) {console.log(error)} )
  }

  function verifyMBI(event)
  {
    fetch('http://localhost:5000/verify', {
      mode: 'cors',
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'mbi' : verifyMbiInput
      })
    })
    .then((response) => {
      if(response.ok) {
        return response.json();
      }
      else {
        throw new Error("Something went wrong with verification")
      }
      })
    .then( data => setVerificationStatus(data))
    .catch( function(error) {console.log(error)} )  }


  return (
    <div className="App"> Generate/Verify MBI
      <header className="App-header">
        <p>
          <button onClick={generateMBI} type='submit'>Generate MBI</button>
          <input readOnly={true} value={generatedMbiId} ></input>
          <br/>
          <button onClick={verifyMBI}>Verify MBI</button>
          <input onChange={e => setVerifyMbiInput(e.target.value)}></input>
          <div>{verificationStatus}</div>
        </p>
      </header>
    </div>
  );
}

export default App;
