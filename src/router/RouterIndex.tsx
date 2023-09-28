import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import BaseLayout from '../layout/BaseLayout'
import routes from './routes'

function RouterIndex() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            element={
              <BaseLayout routeTitle={route.title}>
                <route.element />
              </BaseLayout>
            }
          />
        ))}
      </Routes>
    </Router>
  )
}

export default RouterIndex
