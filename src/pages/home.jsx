import React from "react"
import '../app.css'
import Leftside from '../components/leftside/leftside'
import Rightside from '../components/rightside/rightside'
import Postside from '../components/postside/postside'

const Home = () => (
    <div className='app'>
        <Leftside location='homepage' />
        <Postside location='homepage' />
        <Rightside />
    </div>
)

export default Home