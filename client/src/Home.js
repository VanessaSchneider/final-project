import map from "./mappy.png"
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import door from "./door.png"
import './App.css';


function Home() {
    const [user, setUser] = useState("")
    const [click, setClick] = useState(true)
    const [task, setTask] = useState("")


    useEffect(() => {
        fetch("/getTasks")
    .then((res) => res.json())
    .then((data) => setTask(data))}, 
    [])



    useEffect(() => {
        fetch("/me").then((response) => {
          if (response.ok) {
            response.json().then((data) => setUser(data))
          }
        });
      }, []);

      function handleClick(){
      setClick((click)=>!click)}

   



return(

<div>
{user && click ? <div>
<div id= "door">
<img src = {door} className = "doorSize" alt = "image"></img>
</div>

{user && click ? <NavLink to="/fairy">
    <button onClick = {handleClick}>Go inside the Door!</button>
    </NavLink> : null}
    </div>: <NavLink to="/map">
    <button>Map</button>
    </NavLink>  }
</div>



)




}

export default Home;