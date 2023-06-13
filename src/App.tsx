// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import './App.css';
// import characterCard component

import CharacterCard from './components/CharacterCard';
import Filter from './components/Filter/Filter';
import { type Character } from './models/interfaces';

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
  const [searched,setSearched] = useState<string>("")
  const [nextUrlSearched,setNextUrlSearched] = useState<string>()
  // const [filtered,setFiltered] = useState<string[]>()


  useEffect(
    ()=>{
      
      document.addEventListener('scroll', ()=>{
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
    if (searched==="") {
      const url = new URL(apiRoute);
      url.searchParams.set("page",load.toString())
      console.log(url);
      
      fetch(url).then((response)=>response.json()).then((value) => {
        console.log(value);
        const finalList: Character[]= [...characters,...value.results]
        setCharacters(finalList)
      })
    }else{
      if (nextUrlSearched) {
        const url = new URL(nextUrlSearched);
        fetch(url).then((response)=>response.json()).then((value) => {
          console.log(value);
          const finalList: Character[]= [...characters,...value.results]
          setCharacters(finalList)
          setNextUrlSearched(value.info.next)
        })
      }
    }
    
  },[load])


//   name: filter by the given name.
// status: filter by the given status (alive, dead or unknown).
// species: filter by the given species.
// type: filter by the given type.
// gender: filter by the given gender (female, male, genderless or unknown).


    
  useEffect(()=>{
    if(searched){
      const url = new URL(apiRoute);
      url.searchParams.set("name",searched)
      console.log(url);

      fetch(url).then((response)=>response.json()).then((value) => {
        console.log(value);
        const finalList: Character[]= [...value.results]
        setCharacters(finalList)
        setNextUrlSearched(value.info.next)
      })
    }
    return(
      setLoad(1),
      setCharacters([])
    )
  },[searched])



  return (
    <>

    {/* search bar */}
    <div className="input-group rounded">
      <input type="text" className="form-control" placeholder="Search" onChange={(e)=>{setSearched(e.target.value)}} />
      <button type="button" className="btn btn-primary" onClick={()=>{setLoad(Math.floor(Math.random() * 42) + 1)}} ><i className="fi fi-br-search"></i></button>
    </div>

    {/* filter */}
    <div className="btn-group">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false">
            Filter
      </button>
      <div className="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
      <div className="col">
          <select id="statusFilter" className="form-control">
            <option value="">All Statuses</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div className="col">
          <select id="speciesFilter" className="form-control">
            <option value="">All Species</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            
          </select>
        </div>
        <div className="col">
          <select id="typeFilter" className="form-control">
            <option value="">All Types</option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            
          </select>
        </div>
        <div className="col">
          <select id="genderFilter" className="form-control">
            <option value="">All Genders</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
    </div>
    
    {/* characters */}
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
