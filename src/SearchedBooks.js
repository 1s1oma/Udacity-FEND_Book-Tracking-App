import React from 'react'

class SearchedBooks extends React.Component{
  state = {
        value:"none"
  }

    render(){ 
        const searchedBooks = this.props.searchedBooks != null ? this.props.searchedBooks : [];
        return (
            <ol className="books-grid">
              {searchedBooks.map((book)=> (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail: ""}` }}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf ? book.shelf : "none"} onChange={(event) => {this.props.changeShelf(book, event.target.value)}}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option> 
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                   <div className="book-authors">{this.props.authors(book) ? this.props.authors(book) : ""}</div> 
                  </div>
                </li>
            ))}
            </ol>
        )
    }
}

export default SearchedBooks;