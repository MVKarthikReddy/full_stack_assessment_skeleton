import { useState } from 'react'
import HomesPage from './components/HomesPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomesPage />
    </>
  )
}

export default App
