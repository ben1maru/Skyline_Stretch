import React from 'react'
import Strech from './Strech/Strech'
import './dashboard.css'
import Color from './CRUDColor/Color'
import Application from './Application/Application'

export default function Dashboard() {
  return (
    <div className='main_container_dashboard'><Strech />
   
        <Color/>
        <Application/>
    </div>
  )
}
