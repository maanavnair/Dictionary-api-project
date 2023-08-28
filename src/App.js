import React from 'react'
import { useState, useEffect } from 'react'

export default function App() {

  const [meaning, setMeaning] = useState('');
  const [val, setVal] = useState('');
  const [word, setWord] = useState('');
  const output = ``;

  useEffect( ()=>{
    if(word !== ''){
      const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
      fetch(url)
      .then(res => res.json())
      .then(data => setMeaning(data[0]))
      .catch(error => console.log('Error Fetchibng Data'))
    }
  }, [word]);


  function handleSearch(){
    if(val === ''){
      alert('Field is Empty');
      return;
    }
    setWord(val);
  }

  function handleClear(){
    setVal('');
    setMeaning('');
    setWord('');
  }

  return (
    <div className='app'>
      <h1 className='heading'>Dictionary</h1>
      <div className='input-section'>
      <input
        placeholder='Enter a word...'
        value={val}
        onChange={e => setVal(e.target.value)}
      />
      <button className='btn' onClick={handleSearch}>SEARCH</button>
      <button className='btn' onClick={handleClear}>CLEAR</button>
      </div>
      {meaning &&
        <div className='main-content'>
          <h2>Word: {word}</h2>
          <h2>Meanings:</h2>
          {meaning.meanings.map((meaning, index) =>(
            <div key={index} className='answer'>
              <p className='part-of-speech'>Part of Speech: {meaning.partOfSpeech}</p>
              <ul className='definition-list'>
                {meaning.definitions.map((def, ind) => (
                  <li key={ind}>
                    <div>
                      <p>Definition: {def.definition}</p>
                      {def.example && <p>Example: {def.example}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      }
    </div>
  )
}
