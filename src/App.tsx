// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
// import characterCard component

import CharacterCard from './components/CharacterCard/CharacterCard';
import { type APIResponse, type Character } from './models/interfaces';
import { type Filter } from './models/interfaces';
import FilterComponent from './components/FilterComponent/FilterComponent';

const apiRoute = `https://rickandmortyapi.com/api/character`;
let filter:Filter = {};


function App() {

  const [response,setResponse] = useState<APIResponse>()
  const [nextUrl,setNextUrl] = useState<string | null>(null)
  const [characters,setCharacters] = useState<Character[]>([])
  const [searching,setSearching] = useState(false)


  
  const filterThings = [
    {
      filterName: "status",
      subFilter: [
        "alive",
        "dead",
        "unknown"
      ]
    },
    {
      filterName: "species",
      subFilter: [
        "human",
        "alien",
        "humanoid",
        "unknown"
      ]
    },
    {
      filterName: "gender",
      subFilter: [
        "male",
        "female",
        "genderless",
        "unknown"
      ]
    }
  ];
  
  function onFilter(newfilter:Filter){
    // filter will be the older plus the new one
    
    console.log(filter,newfilter);
    filter={...filter,...newfilter}
    console.log(filter);
    


    let url = new URL(apiRoute)
        // to do: optimize
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
    setSearching(true)
    fetch(url).then(re=>re.json()).then((value) => {
      setCharacters([])
      setResponse(value)
    })
  }

  useEffect(
    ()=>{
      setSearching(true)
      fetch(apiRoute).then((re)=>re.json()).then((value) => {
        setResponse(value)
      })      
    }
    ,
  [])
  
  useEffect(
    ()=>{
      setSearching(false)
      if (response){
        console.log(response);
        setCharacters(
          Array.isArray(response.results)
          ?[...characters,...response.results]
          :[]
        )
        window.addEventListener('scroll',()=>{
          if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 700){
            console.log("end of page");
            console.log(response);
            try {
              setNextUrl(response.info.next)
            } catch (error) {
              console.log("there aren't more pages");
              
            }
          }
        })
      }else{
        console.log("no response");
        setCharacters([])
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
      // setSearching(true)
      fetch(nextUrl).then(re=>re.json()).then((value) => {
        setResponse(value)
      })
    }
   } 
  ,[nextUrl])



  



//   name: filter by the given name.
// status: filter by the given status (alive, dead or unknown).
// species: filter by the given species.
// type: filter by the given type.
// gender: filter by the given gender (female, male, genderless or unknown).


// bug display in just one (alive human unknow) .✔️
// bug display bar no static✔️
// missing spinner ✔️
// bigger spinner
// missing space between cards✔️
// better design for the filter
// del useEffect and its ifs
// separate components filter/search bar


  return (
    <>

    {/* search bar */}
    <div className="container-fluid" style={{background:"#222"}}>
      <div className="row rounded"  
        style={{
          position:"sticky",
          top:0,
          paddingTop:"1em",
          zIndex:1000,
          backgroundColor:"#222"
        }}>

        <FilterComponent onFilterFunction={onFilter} toFilter={filterThings}/>        

      </div>
    {/* characters */}
      <div className="container-fluid ">
        <div className="row g-3 justify-content-around pt-2">
          {
            !searching
            ?(characters.length>0) 
              ? (characters.map((character:Character) => {
              return <CharacterCard key={character.id} character={character}></CharacterCard>
                }))
              :
              // no characters found
              <div className="d-flex justify-content-center align-items-center">
                <h1 className="text-center text-muted">No Characters Found</h1>
              </div>
            :(
              // spinner
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary spinner-border-sm"
                  role="status">
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default App
