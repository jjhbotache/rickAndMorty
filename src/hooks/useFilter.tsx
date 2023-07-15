import { apiRoute } from "../const/const"
import { Filter } from "../models/interfaces"
import { useRef} from 'react';

export default function useFilter() {
  
  const filter = useRef<Filter>({})
  async function filteredFetch(newFilter:Filter) {
    filter.current={...filter.current,...newFilter}
    let url = new URL(apiRoute)
    // // to do: optimize
    // if(filter.current.name){
    //   url.searchParams.append("name",filter.current.name)
    // }
    // if(filter.current.status){
    //   url.searchParams.append("status",filter.current.status)
    // }
    // if(filter.current.species){
    //   url.searchParams.append("species",filter.current.species)
    // }
    // if(filter.current.gender){
    //   url.searchParams.append("gender",filter.current.gender)
    // }
    Object.keys(filter.current).forEach((key) => {
      if (key in filter.current) {
        url.searchParams.append(key, filter.current[key as keyof Filter] || "");
      }
    });
    const response = await fetch(url).then(re=>re.json())
    return response
  }
  
  
  return {
    filteredFetch,
  }
}


// function onFilter(newfilter:Filter){
//   // filter will be the older plus the new one
  
//   filter.current={...filter.current,...newfilter}
//   // console.log(filter.current);
  


//   let url = new URL(apiRoute)
//       // to do: optimize
//   if(filter.current.name){
//     url.searchParams.append("name",filter.current.name)
//   }
//   if(filter.current.status){
//     url.searchParams.append("status",filter.current.status)
//   }
//   if(filter.current.species){
//     url.searchParams.append("species",filter.current.species)
//   }
//   if(filter.current.gender){
//     url.searchParams.append("gender",filter.current.gender)
//   }
//   setSearching(true)
//   fetch(url).then(re=>re.json()).then((value) => {
//     setCharacters([])
//     setResponse(value)
//   })
// }