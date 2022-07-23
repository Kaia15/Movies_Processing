import React from "react"


export default function Movies() {
    const [movie, setMovie] = React.useState({title: ""})
    const [movieList, setMovieList] = React.useState([{title: "Harry Potter"}]);
    const [searchValue, setSearchValue] = React.useState("")
    const [searchList, setSearchList] = React.useState([])

    const inputRef = React.useRef();
    const focusInput = () => {
        inputRef.current.focus();
      };


    const handleSearch = React.useMemo(
        () => {
        if (searchValue !== "") {
            setSearchList(() => {
                let filtered = movieList.filter(item => item.title.includes(searchValue))
                return filtered;
            })
        } else {
            setSearchList([])
            console.log("Please retype your name of movie ")
            // alert("We cannot find your film!")
        }
        }
    , [searchValue, movieList])


    const handleSubmit = () => {
        setMovieList((prev) => ([...prev, movie]))
        setMovie({title: ""})
    }

    // console.log(movieList)
    console.log(searchList)

    return (
        <div>
            <input
                value = {movie.title}
                onChange = {(e) => setMovie((prev) => ({...prev, title: e.target.value}))}
                placeholder = "Enter your movie"
            />
            <br />
            <button onClick = {handleSubmit}> Add </button>
            {movieList.map((mov, index) => (
                <li key = {index}> {mov.title}</li>
            ))}
            <br />
            <input 
                value = {searchValue}
                placeholder="Search your film"
                onChange = {(e) => setSearchValue(e.target.value)}
            />
            <button onClick = {handleSearch}> Search </button>
            {searchList.map(src => (<li>{src.title}</li>))}
        </div>
    )
}