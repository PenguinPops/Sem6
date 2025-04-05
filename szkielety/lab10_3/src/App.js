// src/App.js
import { useState } from 'react'
import HookUseState from './HookUseState'
import Snapshot from './Snapshot'

function App() {
  const [name, setName] = useState("zielony")

  const changeName = () => {
    setName("czerwony")
  }

  return (
    <div className="App">
      <h1>Migawka</h1>
      <Snapshot />
      <h1>Hook useState</h1>
      <HookUseState name={name} changeName={changeName} />
    </div>
  )
}

export default App