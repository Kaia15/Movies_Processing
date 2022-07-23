
// let films = []
const pages = [1,2,3,4,5,6,7,8,9]
/*
const sendReq = page =>
    new Promise(resolve =>
        (page) => {
            const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=4c3513a8f11ca3724bbed6b947d29097&language=en-US&page=${page}`
            const fetch = fetch(url)
            return fetch
        })

/*async function fetch() {
    for (let i = 1; i <=15; i++) {
        const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=4c3513a8f11ca3724bbed6b947d29097&language=en-US&page=${i}`
        const fetched = await fetch(url)
        const jsonFetched = await fetched.json()
        jsonFetched.then(res => films.concat(res))
    }
}

const fetch = async () => {
    for (page of pages) {
        const fetched = await sendReq(page)
        const fetchedData = await fetched.json()
        films.concat(fetchedData['results'])
    }
}

fetch()

*/

let reqs = pages.map(page => fetch(`https://api.themoviedb.org/3/tv/popular?api_key=4c3513a8f11ca3724bbed6b947d29097&language=en-US&page=${page}`))
function a (arr) {
    Promise.all(reqs)
    .then(responses => {
        // all responses are resolved successfully
        return responses
    })
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then((res) => {arr = res
    console.log(arr)})
} 

a([])
    
export default pages