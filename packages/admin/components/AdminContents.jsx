import React from 'react'

const AdminContents = ({ children }) => {
  return (
    <div id="container" className="page--content">
      <main id="page--container">
        {children}
      </main>
    </div>
  )
}

export default AdminContents
