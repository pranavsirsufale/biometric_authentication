import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/Auth'

function Service() {

  const [error ,setError] = useState('')
  const { setServices, services , getService } = useAuth()

  

  useEffect(()=>{
    getService()
  },[])




  return (
    <section className='section-service'>
      <div className='container'>
        <h1 className='main-heading' > Service </h1>
      </div>



      <div className='container grid grid-three-cols'>

          {
            services ? services.map((service)=>{
            
        return (
          <div key={service._id} className='card'>
          <div className='card-img'>
            <img src="/bat.png" alt="" width='300' />
          </div>
          <div className='card-details'>
            <div className='grid grid-two-cols'>
              <p> {service.provider} </p>
              <p> {service.price} ₹ </p>

            </div>
            <h2> {service.service} </h2>
            <p> {service.description} </p>
          </div>
        </div>

        )
}):
            <h1>No Service Found</h1>
          }





      </div>
    </section>
  )
}

export default Service