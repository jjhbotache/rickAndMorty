// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import './App.css';
// import characterCard component

import CharacterCard from './components/CharacterCard';
import { type APIResponse, type Character } from './models/interfaces';
import { type Filter } from './models/interfaces';

const apiRoute = `https://rickandmortyapi.com/api/character`;
// create an url obj


/*
  organizable por nombre,especie
  buscar nombre especie especifico
  buscar por vivo? 
  sin anys
   */

function App() {

  const [response,setResponse] = useState<APIResponse>()
  const [nextUrl,setNextUrl] = useState<string | null>(null)

  const [characters,setCharacters] = useState<Character[]>([])

  const [filter,setFilter] = useState<Filter>()

  useEffect(
    // when it gets the final of the page,
    // it will load the next page
    ()=>{
      fetch(apiRoute).then((re)=>re.json()).then((value) => {
        setResponse(value)
      })      
    }
    ,
  [])
  
  useEffect(
    ()=>{
      if (response){
        console.log(response);
        if (response.results) {
          setCharacters([...characters,...response.results])
        }
        window.addEventListener('scroll',()=>{
          if(window.scrollY + window.innerHeight >= document.body.scrollHeight -100){
            console.log("end of page");
            console.log(response);
            setNextUrl(response.info.next)
          }
        })
      }
      return ()=>{
        window.removeEventListener('scroll',()=>{})
        setCharacters([])
      }
    }
    ,
  [response])

  useEffect(
   ()=>{
    if(nextUrl){
      fetch(nextUrl).then(re=>re.json()).then((value) => {
        setResponse(value)
      })
    }
   } 
  ,[nextUrl])

  useEffect(
    ()=>{
      if(filter){
        let url = new URL(apiRoute)
        if(filter.name){
          url.searchParams.append("name",filter.name)
        }
        if(filter.status){
          url.searchParams.append("status",filter.status)
        }
        if(filter.species){
          url.searchParams.append("species",filter.species)
        }
        if(filter.gender){
          url.searchParams.append("gender",filter.gender)
        }
        fetch(url).then(re=>re.json()).then((value) => {
        setCharacters([])
        setResponse(value)
        })
      }
    },
  [filter])

  



//   name: filter by the given name.
// status: filter by the given status (alive, dead or unknown).
// species: filter by the given species.
// type: filter by the given type.
// gender: filter by the given gender (female, male, genderless or unknown).





  return (
    <>

    {/* search bar */}
    <div className="input-group rounded">
      <input type="text" className="form-control" placeholder="Search" onChange={(e)=>{setFilter({...filter,name:e.target.value})}} />
    </div>

    {/* filter */}
    <div className="btn-group">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false">
            <i className="fi fi-rr-settings-sliders"></i>
      </button>
      <div className="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
      <div className="col">
          <select id="statusFilter" className="form-control" onChange={(e)=>{
            setFilter({...filter,status:e.target.value})
          }}>
            <option value="">All Statuses</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div className="col">
          <select id="speciesFilter" className="form-control" onChange={
            (e)=>{
              setFilter({...filter,species:e.target.value})
            }

          }>
            <option value="">All Species</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            
          </select>
        </div>
        <div className="col">
          <select id="genderFilter" className="form-control" onChange={
            (e)=>{
              setFilter({...filter,gender:e.target.value})
            }
          }>
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
          (characters.length>0) && (characters.map((character:Character) => {
            return <CharacterCard key={character.id} character={character}></CharacterCard>
          }))
        }
      </div>
    </div>

    </>
  )
}

export default App
