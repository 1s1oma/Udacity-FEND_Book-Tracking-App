import React from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchedBooks from './SearchedBooks';

class Search extends React.Component{

  state={
    query:"",
    searchedBooks: []
  }

  updateQuery = (query) =>{
    try{
    BooksAPI.search(query).then((books)=>{//this.setState({query: query});
      this.setState({
        query: query,
        searchedBooks: Array.isArray(books) ? books : []
      });
      console.log("yu",books, query, this.state.searchedBooks, Array.isArray(books));}
    )}catch(error){console.log('e',error);}finally{console.log('fin');}
  }
  
  clearQuery = () =>{
    this.setState({query: " "})
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
                  onChange={(event) => this.updateQuery(event.target.value)}/>{console.log('o',this.state.query)}

              </div>
            </div>
            <div className="search-books-results">
            <SearchedBooks books={this.state.searchedBooks}/>
            </div>
        </div>
          )
    }
}

export default Search