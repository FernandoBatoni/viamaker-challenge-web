import React from 'react'

import RouterIndex from './router/RouterIndex'
import ThemeProvider from './theme/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <RouterIndex />
    </ThemeProvider>
  )
}

export default App
