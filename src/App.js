import React from 'react';
import Search from './Search.js';
import CurrentBooks from './CurrentBooks.js';
import WantToRead from './WantToRead.js';
import Read from './Read.js';

import {Link} from 'react-router-dom';
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props){
    super(props)

    this.handleSearch = this.handleSearch.bind(this);
    this.moveBook = this.moveBook.bind(this);
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    bookShelf:"",
    currentBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    allBooks:[]
  }
  
  componentDidMount(){
  BooksAPI.getAll().then(books => {console.log('b', books);
      this.setState({
        currentBooks: books.filter(book => book.shelf === 'currentlyReading'),
        wantToReadBooks: books.filter(book => book.shelf === 'wantToRead'),
        readBooks: books.filter(book => book.shelf === 'read'),
        allBooks: books
      })
  })
  }
 
  //This method is used by the <Search> Component to allow the onclick of the backbutton to naviagte to the home page
  handleSearch(event){
    this.setState({
      showSearchPage: false
    })
  }

  //This uses the value of each select option of a move and based on it's value, moves it to the correct shelf
  moveBook(book, shelf){
  BooksAPI.update(book, shelf).then(() => {
    book.shelf=shelf;
    this.setState({
      currentBooks: this.state.allBooks.filter(book => book.shelf === 'currentlyReading'),
      wantToReadBooks: this.state.allBooks.filter(book => book.shelf === 'wantToRead'),
      readBooks: this.state.allBooks.filter(book => book.shelf === 'read')
    });
  });
}

  render() {console.log('here', this.state.currentBooks, this.state.allBooks);
    return (
      <div className="app">
        {this.state.showSearchPage ? 
        ( <Route exact path='/Search' render={() => (
          <Search searchHandler={this.handleSearch} />
        )}/>) 
        : 
        (
          <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
               <CurrentBooks books={this.state.currentBooks} changeShelf={this.moveBook}/>
               <WantToRead books={this.state.wantToReadBooks} changeShelf={this.moveBook}/>
               <Read books={this.state.readBooks} changeShelf={this.moveBook}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/Search" onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
            </div>
          </div>
          )}/>
        )}
      </div>
    )
  }
}

export default BooksApp
