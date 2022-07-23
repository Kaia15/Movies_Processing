import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function scrollingBooks(query, pageNumber) {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [books, setBooks] = React.useState([])
    const [HasMore, setHasMore] = React.useState(false)

    /*useEffect(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'http://localhost:9000/api/v1/fake_users/list',
            params: { q: query, page: pageNumber}
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
    })*/
}