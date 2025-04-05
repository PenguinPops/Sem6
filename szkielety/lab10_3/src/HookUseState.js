import { useState } from "react"

const HookUseState = ({ name = "zielony", changeName = () => {} }) => {
  const [state, setState] = useState("Wartość początkowa")
  
  const changeState = () => {
    setState("Inna wartość")
  }

  return (
    <div>
      <button onClick={changeState}>Zmień stan</button>
      <p data-testid="state-value">{state}</p>
      <button onClick={changeName}>Zmień nazwę</button>
      <p data-testid="name-value">{name}</p>
    </div>
  )
}

export default HookUseState