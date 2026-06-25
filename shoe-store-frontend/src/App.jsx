import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [shoes, setShoes] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [message, setMessage] = useState('')

  async function fetchShoes() {
    const response = await fetch('http://127.0.0.1:5000/shoes')
    const data = await response.json()
    setShoes(data)
  }

  useEffect(() => {
    fetchShoes()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    const newShoe = {
      name: name,
      price: Number(price)
    }

    const response = await fetch('http://127.0.0.1:5000/shoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newShoe),
    })

    const data = await response.json()

    setMessage(data.message)
    setShoes([...shoes, data.shoe])
    setName('')
    setPrice('')
  }

  return (
  <div className="container">
      <h1>Shoe Store</h1>

      <h2>Shoes for Sale</h2>

      {shoes.map((shoe) => (
       <div className="shoe-card" key={shoe.id}>
          <h3>{shoe.name}</h3>
          <p>${shoe.price}</p>
        </div>
      ))}

      <h2>Add a Shoe</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Shoe name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add Shoe</button>
      </form>

     {message && <p className="message">{message}</p>}
    </div>
  )
}

export default App
