import React from 'react'

function DeleteBtn({ data ,deleteUser }) {
  return (
    <button onClick={()=>deleteUser(data)} >
        Delete  
    </button>
  )
}

export default DeleteBtn