import React from 'react'
import { Link } from 'react-router-dom'

function Landingscreen() {
  return (
    <div className='row landing justify-content-center mx-0'>
        <div className="col-md-10 my-auto text-center solidline">
            <h2 style={{color: 'white', fontSize:'135px'}}>Cartrabbit</h2>
            <h1 style={{color: 'white', fontSize:'30px'}}>Guest Room Booking project Cartrabbit..</h1>
            <Link to='/home'>
                <button className='btn landingbtn'>Get Started</button>
            </Link>
        </div>
    </div>
  )
}

export default Landingscreen