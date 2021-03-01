import React, {useState, useEffect} from "react";

function PizzaForm({ activePizza, onUpdatePizza }) {

  const [formData, setFormData] = useState({
    topping: activePizza?.topping,
    size: activePizza?.size,
    vegetarian: activePizza?.vegetarian
  })

  useEffect( () => {
    setFormData({
      topping: activePizza?.topping,
      size: activePizza?.size,
      vegetarian: activePizza?.vegetarian
    })
  }, [activePizza])


  const {topping, size, vegetarian} = formData

  function handleFormChange(event){
    const key = event.target.name
    let value
    if (event.target.type === "radio") {
      value = event.target.value === "Vegetarian"
    } else{
      value = event.target.value
    }
    setFormData({...formData, [key]:value })
  }

  function handleFormSubmit(event){
    event.preventDefault()
    onUpdatePizza(activePizza.id, {...formData})
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={topping}
            onChange={handleFormChange}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={size} onChange={handleFormChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="vegetarian"
                value="Vegetarian"
                onChange={handleFormChange}
                checked={vegetarian}
              />
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="vegetarian"
                value="Not Vegetarian"
                onChange={handleFormChange}
                checked={!vegetarian}
              />
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
