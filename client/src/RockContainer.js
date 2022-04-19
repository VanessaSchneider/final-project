import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import paper1 from "./paper.png"
import rock1 from "./rock.png"
import scissors1 from "./scissors.png"
import warlock from "./warlock.png"
import warlockhead from "./warlockhead.png"



function RockContainer({userWins, setUserWins, UserWins}) {
    const [userPlay, setUserPlay] =useState("")
    const [warlockPlay, setWarlockPlay] =useState(null)
    const [warlockWins, setWarlockWins] =useState(0)
    const [wtalks, setWTalks] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [rocks, setRocks] = useState("")
    const [user, setUser] = useState("")



    useEffect(() => {
      fetch("/getRocks")
  .then((res) => res.json())
  .then((data) => setRocks(data))}, 
  []);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((data) => setUser(data));
      }
    });
  }, []);

  const warlockArray = ["rock", "paper", "scissors"]


  const getRandomPlay = () => 
   warlockArray[Math.floor(Math.random() * warlockArray.length)]

  function increment()
    {setWTalks((wtalks)=>wtalks +=1) }


 async function handleClick(e){
  setWarlockPlay(getRandomPlay())
  setUserPlay(e.target.value)


    if (userPlay === "rock" && warlockPlay === "scissors"){
       await UserWins()
      fetch("/createrock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( 
          {
              "task_id": user.task.id, 
              "win": true
        }),
    })
      .then((r) =>r.json())
      .then((data)=>console.log("comeback",data))
  }



    else if (userPlay === "paper" && warlockPlay === "rock"){

     fetch("/createrock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( 
          {
              "task_id": user.task.id, 
              "win": true
        }),
    })
      .then((r) => r.json())
      .then((data)=>console.log("comeback",data))
  }



    else if (userPlay === "scissors" && warlockPlay === "rock")
      {await setWarlockWins((warlockWins)=>warlockWins += 1)}


    else if(userPlay === "rock" && warlockPlay === "paper")
      {await setWarlockWins((warlockWins)=>warlockWins += 1)}

    else if(userPlay === "scissors" && warlockPlay === "paper"){
      
          fetch("/createrock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( 
              {
                  "task_id": user.task.id, 
                  "win": true
            }),
        })
          .then((r) => r.json())
          .then((data)=>console.log("comeback",data))
      }


    if(userPlay === "paper" && warlockPlay === "scissors")
        {await setWarlockWins((warlockWins)=>warlockWins += 1)
        }

    if (userPlay === warlockPlay){
        return null}

    setSubmitted((submitted)=>!submitted)

 }


  function Submitted(){
    setSubmitted((submitted)=>!submitted)
  }

  function Display()
     {if (userPlay === "rock")
        {return <img src = {rock1} className = "rockButton"></img> }
    else if (userPlay ==="scissors")
      {return <img src = {scissors1} className = "rockButton"></img> }
    else if (userPlay === "paper")
  {return <img src = {paper1} className = "rockButton"></img> }
  }


  function Display2()
    {if (warlockPlay === "rock")
      {return <img src = {rock1} className = "rockButton"></img> }
   if (warlockPlay ==="scissors")
      {return <img src = {scissors1} className = "rockButton"></img> }
    if (warlockPlay === "paper")
      {return <img src = {paper1} className = "rockButton"></img> }
  }

 

  function Wins() {
    if (userPlay === "rock" && warlockPlay === "scissors"){
      return <h3> You Win!</h3>}


    else if(userPlay === "scissors" && warlockPlay === "rock"){
      return <h3> Warlock Wins! </h3>} 


    else if(userPlay === "rock" && warlockPlay === "paper"){
        return <h3> Warlock Wins! </h3>}

    else if(userPlay === "scissors" && warlockPlay === "paper"){  
      return <h3> You Win! </h3>}


    else if(userPlay === "paper" && warlockPlay === "rock"){
        return <h3> You Win!  </h3>}
  

    else if(userPlay === "paper" && warlockPlay === "scissors"){
      return <h3>  Warlock Wins! </h3>}

    else if(userPlay === warlockPlay)
      {return <h3> You Tied! </h3>}
  }
  
   


return (


<div>
  {wtalks !== 2 ?<img src = {warlock} className = "mapsize" alt = "image"></img> : null}
  {wtalks === 0 ?<div> <p>Well, well, well. You finally made it to my castle. I see you got past my friends guarding the path. I also suppose that chicken with you wants to take back his Kingdom? </p>
  <button className = "buttons" onClick = {increment} >Say, "Yes"</button> </div> : null}
  {wtalks ===1 ? <div> <p>There is only one fair way to solve this... and it's Rock, Paper, Scissors. If you can win 5 times, I will surrender!</p>
  <button className = "buttons" onClick = {increment} >Play Rock, Paper, Scissors</button> </div> : null}


  {wtalks ==2 && userWins < 5 ? <img src = {warlockhead} className = "watch" alt = "image"></img> : null}
  {submitted===false && wtalks === 2 ? <div> Your Wins: {userWins} Warlock Wins: {warlockWins} </div>: null}
  {wtalks ===2 && submitted ==false ? 
<div>
<br></br>
<div>
  <img src = {rock1} className = "small-size"></img> 
  <button className = "buttons" value = "rock" onClick= {handleClick}>Rock</button>
</div>
<div>
  <br></br>
  <img src = {paper1} className = "small-size"></img> 
  <button className = "buttons" value = "paper" onClick= {handleClick}>Paper</button>
</div>
<div>
<br></br>
  <img src = {scissors1} className = "small-size"></img> 
  <button className = "buttons" value = "scissors" onClick= {handleClick}>Scissors</button>
  </div></div>  : null }
<br></br>
<br></br>

  {warlockPlay !==null && submitted === true ?
<div>
  You played {Display()}
<br></br>
  Warlock played {Display2()}
<br></br>
  {Wins()}
  <button className = "buttons" onClick = {Submitted}>Next Round</button>
</div>
  :null}
</div>

)}


export default RockContainer;