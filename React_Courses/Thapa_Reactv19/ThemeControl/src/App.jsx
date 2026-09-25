import React from 'react'
import { DarkLight, ThemeProvider } from './ContextAPI/DarkLight'

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <DarkLight />
      </ThemeProvider>
    </div>
  )
}

export default App
