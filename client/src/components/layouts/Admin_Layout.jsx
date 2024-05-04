import React from 'react'
import { Outlet , NavLink } from 'react-router-dom'
import { FaUserSecret , FaCommentAlt } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { RiCustomerService2Fill , RiContactsBook3Fill } from "react-icons/ri";



function Admin_Layout() {
  return (

      <>
    <header>
      <div className='container'>
        <nav>
          <ul>
            <li> <NavLink to=''> <FaUserSecret /> Home </NavLink> </li>
            <li> <NavLink to='users' > <ImUsers/> Users </NavLink> </li>
            <li> <NavLink to='contacts' > <FaCommentAlt/> Contacts </NavLink> </li>
            <li> <NavLink to='services' > <RiCustomerService2Fill/> Services </NavLink> </li>
          </ul>
        </nav>
      </div>
    </header>

    <Outlet />
    </>
  )
}

export default Admin_Layout