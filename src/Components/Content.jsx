import axios from 'axios'
import React, { useState } from 'react'

import searchIcon from "../Assets/search.png"

export default function Content() {

    const openPage = (url) => {
        window.open(url, "_blank")
    }

    const getBooks = async () => {
        try {
            const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
            console.log(res.data.items);
            setBooks(res.data.items)
        } catch (error) {
            console.log(error);
        }
    }


    const [books, setBooks] = useState(null)
    const [search, setSearch] = useState("")
    const [hovering, setHovering] = useState(false)


    const handleSearch = (e) => {
        e.preventDefault()
        console.log(search);
        getBooks()
    }

    const handleShow = (key) => {
        setHovering(true)
    }
    const handleHide = (key) => {
        setHovering(false)
    }

    return (
        <div className='content'>
            <form>
                <input type="text" placeholder='Search For A Book' value={search}
                    onChange={(e) => { setSearch(e.target.value) }} />

                <button type="submit" onClick={(e) => { handleSearch(e) }} >
                    <img className='bookImg' style={{ width: "34px", border: "0" }} src={searchIcon} alt="search" />
                </button>

            </form>

            <div className='books-container'>
                {books && books.map((book, key) => {
                    return (
                        <div key={key}>
                            <div onMouseEnter={() => { handleShow(key) }}
                                onMouseLeave={() => { handleHide(key) }} style={{ position: "relative" }}
                                onClick={() => { openPage(book.volumeInfo.previewLink) }} className='book-tile'>
                                <img src={book?.volumeInfo?.imageLinks?.thumbnail} alt="book " />
                                <div style={{
                                    position: "absolute", bottom: "0",
                                    backgroundColor: "rgba(0, 0, 0, 0.8)", color: "white", textAlign: "center"
                                }}>
                                    {book.volumeInfo.title}</div>
                                <div className='dark' style={{
                                    position: "absolute", bottom: "100px",
                                    color: "white", textAlign: "center"
                                }}>
                                    <div>
                                        {hovering && <div className='additional'>
                                            <div style={{ fontWeight: "bold" }}>{book.volumeInfo.title}</div>
                                            <div style={{ fontSize: "16px" }}>{book.volumeInfo.authors[0]}</div>
                                            <div style={{ fontSize: "14px" }}>PAGE COUNT:{book.volumeInfo.pageCount}</div>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}
