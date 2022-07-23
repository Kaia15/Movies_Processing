import logo from './logo.svg';
import './App.css';
// import Content from '../src/Components/Content';
import React, { useEffect, useState, useRef } from 'react';
// import Movies from '../src/Movies/Movies';
import SearchBox from './Movies/SearchBox.js/searchBox';
import MovieList from './Movies/MovieList/MovieList';
import films from './Movies/Films/films';
import Pagination from '../src/Pagination/pagination';
import Filter from '../src/Movies/Filter/filter';
import genres from '../src/Movies/Filter/filteredTypes/Genres';
import nations from '../src/Movies/Filter/filteredTypes/Nations';
import popular from '../src/Movies/Filter/filteredTypes/Popular';
import years from '../src/Movies/Filter/filteredTypes/Years';


export default function App() {
  const storageMovies = JSON.parse(localStorage.getItem('movieList'));

  const [movie, setMovie] = React.useState({})
  const [movieList, setMovieList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("")
  const [searchList, setSearchList] = React.useState([])
  const [filterVal, setFilterVal] = React.useState("")
  const [filteredRes, setFilteredRes] = React.useState([])
  const [afterFilter, setAfterFilter] = React.useState([])
  const [hide, setHide] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [all, setAll] = React.useState([])
  const size = 12;
  
  useEffect(() => {
    const jsonFilms = JSON.stringify([]);
    setMovieList(movieList);
    localStorage.setItem('movieList', jsonFilms);

  }, [movieList])

  const handleSearch = React.useEffect(
    () => {
    if (searchValue !== "") {
        setSearchList(() => {
            let filtered = movieList.filter(item => {
              const name = item.name
              return name.toLowerCase().includes(searchValue) || name.toUpperCase().includes(searchValue)});
            return filtered;
        })
    } else {
        setSearchList([])
        console.log("Please retype your name of movie ")
        // alert("We cannot find your film!")
    }
    
    /*fetchSearch(searchValue).then(a => { setSearchList(a) })
    return () => {}
    }*/
  }, [searchValue])

  const handleSubmit = () => {
    setMovieList((prev) => ([...prev, movie]))
    setMovie({Title: "", Year: "", imdbID: "", Type: "", Poster: ""})
  }

  const searchInput = (e) => {
    setSearchValue(e.target.value);
  }

  const filterType = (input) => {
    setFilterVal(input)
    const options = matchedArr(input)
    setFilteredRes(options);
  }

  const matchedArr = (t) => {
    switch(t) {
      case "Genres":
        return genres
      case "Nations":
        return nations
      case "Popular":
        return popular
      case "Years":
        return years
      default:
        return []
    }

  }

  const movieInput = ({target}) => {
    const {name, value} = target;
    // console.log(target);
    setMovie((prev) => ({...prev, [name]: value}))
    console.log(movie);
  }

  const findIn = (e, arr) => {
    return arr.includes(e)
  }

  const readyFilter = (e) => {
    console.log(e)
    // console.log(genres.includes(e))
    let filteredFilms = [];
    if (findIn(e, genres)) {
      filteredFilms = movieList.filter(f => {
        let t = f.Type
        return t.toLowerCase() === e.toLowerCase() })
    } else if (findIn(e, nations)) {
      filteredFilms = movieList.filter(f => {
        let n = f.Nation
        return n.toLowerCase() === e.toLowerCase()
      })
    } else if (findIn(e, years)) {
      filteredFilms = movieList.filter(f => {
        let y = f['first_air_date'];
        return y.substr(0,4) === e
      })
    }
    return filteredFilms
  }

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=4c3513a8f11ca3724bbed6b947d29097&language=en-US&page=${page}`
    const fetchedMovies = await fetch(url)
    const jsonMovies = await fetchedMovies.json()
    return jsonMovies
  }

  const fetchSearch = async (key) => {
    const searchURL = `https://api.themoviedb.org/3/search/${key}?api_key=4c3513a8f11ca3724bbed6b947d29097&page=1`
    const fetchedSearch = await fetch(searchURL)
    const jsonSearch = await fetchedSearch.json()
    return jsonSearch
  }


  useEffect(() => 
    {
      fetchData().then(a => { setMovieList(movieList.concat(a['results']))
                            })
      return () => {}
    }, [page])

  
  // console.log(movieList.concat({Title: "Harry Potter"}))
  console.log(movieList);
  console.log(searchList);
  
  // console.log(movieList);
  // console.log(filterVal);
  // console.log(filteredRes)
  // console.log(afterFilter)
  // console.log(hide)
  

  return (
    <div className='App'>
      <SearchBox searchInput = {searchInput} search = {searchValue} handleSearch = {() => handleSearch}/>
      {searchList.map((src, index) => (<li key = {index} >{src.name}</li>))}
      <Filter filterType = {filterType} />
      {filteredRes.length > 0 && filteredRes.map(res => 
          {return <li key = {res} onClick = {() => 
            {
              setHide(!hide)
              setAfterFilter(readyFilter(res))
            }}> {res} </li>})}
      <br />
      {
        afterFilter.map(a => {return (<li key = {a.imdbID}> {a.name} </li>)})
      }
      
      <div className = "Movies">
      {
        movieList.length > 0 && movieList.map((mov, index) => 
          {
            const imgPath = `https://www.themoviedb.org/t/p/w1280/${mov.poster_path}`
            return (
              
              <div className='Movie' key = {index}>
                <div className = "Poster">
                  <img src = {imgPath}  style = {{width: "70%", height: "90%"}}/>
                </div>
                <div className = "Info" style={{listStyleType: "none"}}>
                  <li>Title: {mov.name} </li>
                  <li>Year: {mov.first_air_date} </li>
                </div>
                
              </div>
              
            )
          }
          
        )
      }
      </div>
      <div className = "Page_Btn">
                  
                  <button id = "Up" onClick = {() => setPage(page + 1)}>  Load more </button>
                </div>
    </div>

  );
}

/*
function App() {

  const [pageAndsize, setPageAndSize] = React.useState({page: "1", size: "50"})
  const [list, setList] = React.useState([])

  const handleChange = ({target}) => {
    const {name, value} = target;
    setPageAndSize((prev) => ({...prev, [name]: value}))
  }

  const handleSubmit = ({target}) => {
    const {name, value} = target;
    setPageAndSize((prev) => ({...prev, [name]: value}))
    // setPageAndSize({page: "", size: ""})
  }

  useEffect(() => {
    if (pageAndsize.page !== "" && pageAndsize.size !== "") {
      const page = parseInt(pageAndsize['page']);
      const size = parseInt(pageAndsize['size']);
      fetch(`http://localhost:9000/api/v1/fake_tasks/scroll/?page=${page}&size=${size}`)
        .then(res => res.json())
        .then(posts => {
            setList(posts)
        })
    } else {
      alert ("please enter your page and size")
    }
    
    
  }, [pageAndsize])

  console.log(pageAndsize);

  return (
      <div>
          Page: <input value = {pageAndsize.page}
                        name = "page"
                        onChange = {handleChange}
          />
          <br />
          Size: <input value = {pageAndsize.size}
                  name = "size"
                  onChange = {handleChange}
          />      
          <br />
          <button onClick = {handleSubmit}> Submit</button>
          {list.length > 0 && list.map((l, index) => (
              <li key = {index}>{l.title}</li>
          ))}
      </div>
  )
}

/*function App() {
  const [pageAndSize, setPageAndSize] = React.useState({page: "", size: ""})

  const handleSubmit = ({target}) => {
    const {name, value} = target;
    if (pageAndSize['page'] !== "" && pageAndSize['size'] !== "") {
      setPageAndSize((prev) => ({...prev, [name]: value}))
    }
    else {
      alert('abcd')
    }
  }

  console.log(pageAndSize)
  const {list, hasMore, loading, error} = Pagination(pageAndSize)
  // console.log(list);

  return (
    <div>
      <input type = "text"
            name = "page"
            value = {pageAndSize.page}
            onChange = {(e) => setPageAndSize((prev) => ({...prev, page: e.target.value}))}
      />
      <br />
      <input type = "text"
              name = "size"
              value = {pageAndSize.size}
              onChange = {(e) => setPageAndSize((prev) => ({...prev, size: e.target.value}))}
      />
      <br />
      <button onClick = {handleSubmit}> Click me!</button>
      {list.length > 0 && list.map((obj, index) => {
        // console.log(index, obj.title);
        return <li key = {index}> {index}, {obj.title} </li>
      })}
    </div>
  )
}*/

// import React, { useRef, useState } from "react";

/*export default function App() {
  const listInnerRef = useRef();
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const buttonRef = React.useRef();

  // tìm hiểu event loop, và debounce

  const onScroll = () => {
    // console.log(listInnerRef.current)
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log(listInnerRef.current['scrollTop'], listInnerRef.current['scrollHeight'], listInnerRef.current['clientHeight'])
      if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
        console.log("reached bottom");
        // setPage(page + 1);
        if (buttonRef.current) {
          clearTimeout(buttonRef.current)
          setLoading(false)
        }
        buttonRef.current = setTimeout(() => {setPage(page + 1)
                                              setLoading(true)}, 200)
      }
    }
  };

  const fetchData = async(size) => {
    
    const response = await fetch(`http://localhost:9000/api/v1/fake_users/scroll/?page=${page.toString()}&size=${size}`)
    const jsonList = await response.json();
    
    // return jsonList
    console.log(jsonList)
    // jsonList.then(console.log);
    setUsers(users.concat(jsonList));
  }

  React.useEffect(() => {
    let ajaxTime= new Date().getTime();
    fetchData(10)
    let endTime = new Date().getTime();
    let a = endTime - ajaxTime;
    console.log(ajaxTime, endTime, a);
    return () => {}
  }, [page])

  // fetchData(90)
  console.log(users)

  return (
    <div>
      <div className='head'></div>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
        className = "user"
      >
      {users.length > 0 && users.map((obj, index) => {
        return (
        <div key = {obj.id} className = "Info">
          <div style = {{flex: "5", display: "flex", flexDirection: "row"}}>
            <div style = {{flex: "2"}}></div>
            <img src = {obj['clientProfile'].imageURL} style = {{ borderRadius: "50%", width: "70%", height: "70%", flex: 3, marginTop: "30px"}}/>
            <div style = {{flex: "2"}}></div>
          </div>
          <div className = "Info_list" style = {{flex: "5", display: "flex", flexDirection: "row"}}>
              <div className='left' style = {{flex: "3.5"}}></div>
              <div className='middle' style = {{flex: "6"}}>
                <li id = "info"> Name: {obj.name} </li>
                <li id = "info"> Age: {obj.age} </li>
                <li id = "info"> Gender: {obj.gender} </li>
                <li id = "info"> Contact: {obj.email} </li>
              </div>
              <div className='right'style = {{flex: "3.5"}}></div>
          </div>
          
        </div>
        
        )
      })}
      {loading && (<div id ="load"> Loading... </div>)}
      </div>
      
    </div>
  );
}
*/

/*export default function App() {
  
  const pages = [1,2,3,4,5,6,7,8,9]
  const [all, setAll] = React.useState([])

  let reqs = pages.map(page => fetch(`https://api.themoviedb.org/3/tv/popular?api_key=4c3513a8f11ca3724bbed6b947d29097&language=en-US&page=${page}`))
  async function a() {
    const requests = await Promise.all([...reqs])
    const b = await Promise.all(requests.map(req => req.json()))
    // console.log(b)
    
  }

 
  // list = a([])
  // console.log(all)
  return (
    <div>
      
    </div>
  )
}
*/