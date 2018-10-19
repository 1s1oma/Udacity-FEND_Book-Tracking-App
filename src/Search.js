import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchedBooks from './SearchedBooks';

class Search extends React.Component{
  constructor(props){
    super(props)

    this.updateShelfOfSearchedBooks = this.updateShelfOfSearchedBooks.bind(this);
  }

  state={
    query:"",
    searchedBooks: []
  }

  //Updates the query and also gets the books searched
  updateQuery = (query) =>{
    BooksAPI.search(query).then((books)=>{
      this.setState({
        query: query,
        searchedBooks: Array.isArray(books) ? books : []
      });
  });
}
  
  clearQuery = () =>{
    this.setState({query: " "})
}

//When the user types in the search bar, updated the diplayed books with the correct shelf
updateShelfOfSearchedBooks(searchedBooks, shelfedBooks){
  let books = searchedBooks.map(book => {
    for(let i=0; i<shelfedBooks.length; i++){
      if(book.id === shelfedBooks[i].id){
        book.shelf = shelfedBooks[i].shelf
      }
      else{
        book.shelf = "none";
      }
    }
    this.setState({
      searchedBooks: books
    });
  })
}

    render(){

        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" onClick={this.props.searchHandler}>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                  <input type="text" placeholder="Search by title or author" value={this.state.query}
                  onChange={(event) => {this.updateQuery(event.target.value); this.updateShelfOfSearchedBooks(this.state.searchedBooks, this.props.shelfedBooks);}}/>

              </div>
            </div>
            <div className="search-books-results">
            <SearchedBooks searchedBooks={this.state.searchedBooks} shelfedBooks={this.props.shelfedBooks} changeShelf={this.props.changeShelf} authors={this.props.authors}/>
            </div>
        </div>
          )
    }
}

export default Search