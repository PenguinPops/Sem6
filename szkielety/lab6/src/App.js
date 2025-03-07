// Zadanie 1 --------------------------------------------------------------

// import React from 'react';
// import Card from './Card';
// import './App.css';

// function App() {
//   return (
//     <div>
//       <h1>Słynni informatycy</h1>
//       <Card 
//         name="Alan Turing" 
//         image="https://mdz.cs.pollub.pl/ai/alan_turing.jpg" 
//         dates="1912 - 1954"
//         profession="Matematyk"
//         country="Angilia"
//       />
//       <Card 
//         name="Niklaus Wirth" 
//         image="https://mdz.cs.pollub.pl/ai/nicolas_wirth.jpg" 
//         dates="1934 - ?"
//         profession="Elektronik i informatyk"
//         country="Szwajcaria"
//       />
//       <Card 
//         name="Dennis Ritchie" 
//         image="https://mdz.cs.pollub.pl/ai/dennis_ritchie.jpg" 
//         dates="1941 - 2011"
//         profession="Matematyk, fizyk, informatyk"
//         country="USA"
//       />
//       <Card 
//         name="Bjarne Stroustrup" 
//         image="https://mdz.cs.pollub.pl/ai/bjarne_stroustrup.jpg" 
//         dates="1950 -"
//         profession="Informatyk"
//         country="Dania"
//       />
//     </div>
//   );
// }

// export default App;

// Zadanie 2 --------------------------------------------------------------

// import { useState } from "react"
// import './App.css'
// function App() {
//   const [result, setResult] = useState(null)
//   const [input1, setInput1] = useState(null)
//   const [input2, setInput2] = useState(null)
//   const calculate = (e) => {
//     // eslint-disable-next-line
//     let res = eval(`${input1} ${e.target.innerHTML} ${input2}`).toFixed(2)
//     setResult(res)
//   }
//   const firstInput = (e) => {
//     let value1 = e.target.value
//     setInput1(value1)
//   }
//   const secondInput = (e) => {
//     let value2 = e.target.value
//     setInput2(value2)
//   }
//   return (
//     <div className="App">
//       <h1>Kalkulator czterodziałaniowy</h1>
//       <div>
//         <span>
//           <input
//             type="number"
//             onChange={firstInput}
//             style={{ width: "5rem", height: "2rem", margin: "0.5rem" }}
//           />
//         </span>
//         <span>
//           <input
//             type="number"
//             onChange={secondInput}
//             style={{ width: "5rem", height: "2rem", margin: "0.5rem" }}
//           />
//         </span>
//       </div>
//       <div style={{ margin: "2rem" }}>
//         <button onClick={calculate} style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}>
//           +
//         </button>
//         <button onClick={calculate} style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}>
//           -
//         </button>
//         <button onClick={calculate} style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}>
//           *
//           </button>
//         <button onClick={calculate} style={{ margin: "0.3rem", width: "3rem", height: "2rem" }}>
//           /
//         </button>
//       </div>
//       <h4>Wynik: {result}</h4>
//     </div>
//   )
// }
// export default App

// Zadanie 3 --------------------------------------------------------------

// import { useState, useEffect } from 'react';
// import "./Woda.css"; // Importowanie pliku CSS

// function App() {
//   const [temperature, setTemperature] = useState(0);
//   const [stateMatter, setStateMatter] = useState("");

//   const handleChange = (event) => {
//     setTemperature(event.target.value);
//   };

//   useEffect(() => {
//     if (temperature <= 0) {
//       setStateMatter("stały");
//     } else if (temperature >= 100) {
//       setStateMatter("gazowy");
//     } else {
//       setStateMatter("ciekły");
//     }
//   }, [temperature]);

//   return (
//     <div className="temperature">
//       <label>Temperatura:&nbsp;
//         <input
//           type="text"
//           onChange={handleChange}
//           value={temperature}
//           placeholder="Wprowadź temperaturę wody"
//         />&nbsp;°C
//       </label>
//       <div className={stateMatter}>
//         <p>
//           W temperaturze {temperature} °C woda jest w stanie
//           <span> {stateMatter}m.</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;

// Zadanie 4 --------------------------------------------------------------

// import { useState } from 'react'
// import './zad4.css'
// import { toppings } from "./toppings"
// const getFormattedPrice = (price) => `$${price.toFixed(2)}`
// function App() {
//   const [checkedState, setCheckedState] = useState(
//     new Array(toppings.length).fill(false)
//   )
//   const [total, setTotal] = useState(0)
//   const handleOnChange = (position) => {
//     const updatedCheckedState = checkedState.map((item, index) =>
//       index === position ? !item : item)
//     setCheckedState(updatedCheckedState)
//     const totalPrice = updatedCheckedState.reduce(
//       (sum, currentState, index) => {
//         if (currentState === true) {
//           return sum + toppings[index].price
//         }
//         return sum
//       },
//       0
//     )
//     setTotal(totalPrice)
//   }
//   return (
//     <div className="App">
//       <h3>Wybierz składniki</h3>
//       <ul className='toppings-list'>
//         {toppings.map(({ name, price }, index) => {
//           return (
//             <li key={index}>
//               <div className='toppings-list-item'>
//                 <div className='left-section'>
//                   <input
//                     type="checkbox"
//                     id={`custom-checkbox-${index}`}
//                     name={name}
//                     value={name}
//                     checked={checkedState[index]}
//                     onChange={() => handleOnChange(index)}
//                   />
//                   <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
//                 </div>
//                 <div className='right-section'>{getFormattedPrice(price)}</div>
//               </div>
//             </li>
//           )
//         })}
//         <li>
//           <div className='toppings-list-item'>
//             <div className='left-section'>Total:</div>
//             <div className='right-section'>{getFormattedPrice(total)}</div>
//           </div>
//         </li>
//       </ul>
//     </div>
//   )
// }
// export default App

// Zadanie 5 --------------------------------------------------------------

import { useState } from 'react'
import Result from './components/Result'
import Keypad from "./components/Keypad"
import './zad5.css'
function App() {
  const [state, setState] = useState({ result: "" })
  const onClick = button => {
    switch (button) {
      case "=":
        calculate()
        break
      case "C":
        reset()
        break
      case "CE":
        backspace()
        break
      default:
        setState({ result: state.result + button })
    }
  }
  const calculate = () => {
    try {
      setState({
        // eslint-disable-next-line
        result: (eval(state.result) || "") + ""
      })
    } catch (e) {
      setState({
        result: "error"
      })
    }
  }
  const reset = () => {
    setState({
      result: ""
    })
  }
  const backspace = () => {
    setState({
      result: state.result.slice(0, -1)
    })
  }
  return (
    <div>
      <div className="srodek">
        <div className="kalkulator">
          <h3>Kalkulator</h3>
          <Result result={state.result} />
          <Keypad onClick={onClick} />
        </div>
      </div>
    </div>
  )
}
export default App
