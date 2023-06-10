// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import './App.css';
// import characterCard component

import CharacterCard from './components/CharacterCard';
import Filter from './components/Filter';
import { Character } from './models/interfaces';

const apiRoute = `https://rickandmortyapi.com/api/character`;
// create an url obj


/*
  organizable por nombre,especie
  buscar nombre especie especifico
  buscar por vivo? 
  sin anys
   */

function App() {

  const [characters,setCharacters] = useState<Character[]>([])
  const [load,setLoad] = useState<number>(1)




  Notification.requestPermission();

  useEffect(
    ()=>{
      
      document.addEventListener('scroll', ()=>{
        // console.log("wih:", window.innerHeight);
        // console.log("wsy:", window.scrollY);
        // console.log("dbo:", document.body.offsetHeight);
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight-100) {
          setLoad((load) => load+1)
          console.log(load);
        }
      })
      return(
        document.removeEventListener('scroll',()=>{
          console.log("removed");
        })
      )

    },
    []
  )



  useEffect(()=>{
    // add a parameter to the url
    const url = new URL(apiRoute);
    url.searchParams.set("page",load.toString())
    console.log(url);
    
    fetch(url).then((response)=>response.json()).then((value) => {
      console.log(value);
      const finalList: Character[]= [...characters,...value.results]
      setCharacters(finalList)
    })
    new Notification("Number of characters", {
      body: "You are in page "+load
    });
  },[load])

  

    

  

  const featuresToFilter = [
    { name: "nombre", function: 1 },
    { name: "estado", function: 1 }
  ];

  // set load to a random number

  

  return (
    <>

    <div className="input-group rounded">
      <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
      <button type="button" className="btn btn-primary" onClick={()=>{setLoad(Math.floor(Math.random() * 42) + 1)}} ><i className="fi fi-br-search"></i></button>
    </div>

    <Filter featuresToFilter={featuresToFilter}></Filter>
    
    <div className="container-fluid">
      <div className="row g-3">
        {
          characters.length>0 &&( characters.map((character:Character) => {
            return <CharacterCard key={character.id} character={character}></CharacterCard>
          }))
        }
      </div>
    </div>

    </>
  )
}

export default App
