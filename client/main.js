import React from 'react'
import ReactDOM from 'react-dom'

function App () {
  return (
    <div className='App'>
      <h1>Howdy</h1>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
