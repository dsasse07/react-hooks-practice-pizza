import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

  const [pizzas, setPizzas] = useState([])
  const [activePizza, setActivePizza] = useState({
    vegeratian: false
  })
  const API = "http://localhost:3001/pizzas"

  useEffect( () => {
    fetch(API)
      .then( response => response.json() )
      .then ( setPizzas )
  }, [])

  function handleEditClick(pizza){
    setActivePizza(pizza)
  }

  function handleUpdatePizza(id, activePizza){
    const patchConfig = {
      method:"PATCH",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify( activePizza )
    }

  fetch(`${API}/${id}`, patchConfig)
  .then( response => response.json() )
  .then( updatedPizza => {
    const updatedPizzas = pizzas.map( pizza => {
      if (pizza.id !== updatedPizza.id) return pizza
      return updatedPizza
    })
    setPizzas(updatedPizzas)
  })
  }

  return (
    <>
      <Header />
      <PizzaForm activePizza={activePizza} onUpdatePizza={handleUpdatePizza} />
      <PizzaList pizzas={pizzas} onEditClick={handleEditClick}/>
    </>
  );
}

export default App;
