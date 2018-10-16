import React from 'react'

class SearchedBooks extends React.Component{
    state = {
        value: "currentlyReading"
    }

    render(){ 
        const books = this.props.books; console.log('books', books);
        return (
            <ol className="books-grid">
              {books.map((book)=> (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}></div>
                      <div className="book-shelf-changer">
                        <select value={this.state.value} onChange={(event) => this.props.changeShelf(book, event.target.value)}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors.map(author => author)}</div>
                  </div>
                </li>
            ))}
            </ol>
        )
    }
}

export default SearchedBooks;