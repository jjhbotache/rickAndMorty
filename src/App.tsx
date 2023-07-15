// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useRef, useState } from 'react';

// import CharacterCard from './components/CharacterCard/CharacterCard';
import { type APIResponse, type Character } from './models/interfaces';
import { type Filter } from './models/interfaces';
import FilterComponent from './components/FilterComponent/FilterComponent';
import Spinner from './components/Spinner/Spinner';
import Cards from './components/Cards/Cards';
import { apiRoute } from './const/const';
import useFilter from './hooks/useFilter';



function App() {

  const [response,setResponse] = useState<APIResponse>()
  const [nextUrl,setNextUrl] = useState<string | null>(null)
  const [characters,setCharacters] = useState<Character[]>([])
  const [searching,setSearching] = useState(false)
  const {filteredFetch} = useFilter()



  
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
    setSearching(true)
    filteredFetch(newfilter).then((value) => {
      setCharacters([])
      setResponse(value)
    }).finally(
      ()=>setSearching(false)
    )
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
// separate components filter/search bar✔️


  return (
    <>

    <div className="container-fluid ">
      <FilterComponent onFilterFunction={onFilter} toFilter={filterThings}/>        
      <div className="row g-3 justify-content-around pt-2">
          {
            searching
            ?<Spinner/>
            :<Cards characters={characters} />
          }
      </div>
    </div>
    </>
  )
}

export default App
