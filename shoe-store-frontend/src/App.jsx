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

  return (
    <>
     
    </>
  )
}

export default App
