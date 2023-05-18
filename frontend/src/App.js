import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data,setData]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:7500/launc")
    .then(res=>setData(res.data.kartik))
    .catch(err=>console.log(err))
  },[])
  return (
    <div className="App">
      <div className='main'>
        {
          data.length>0&&data.map((item,ind)=>{
            return(
              <div key={ind}>
                <div>
                  <img src={item.links.mission_patch}/>
                </div>
                <p>{item.flight_number}</p>  
                <p>{item.mission_name}</p>  
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
