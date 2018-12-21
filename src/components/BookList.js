import React, { Component } from 'react';
import {graphql} from 'react-apollo'      //graphql is used to bind the query response to the component
import {getBooksQuery} from '../graphql_queries'
import {BookDetails} from '.'

class BookList extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      selected: null
    }
  }

  displayBooks(){
    var data = this.props.data
    return data.loading ? <div>Loading books..</div> : data.books.map( book => {
      return(<li key={book.id} onClick={(e)=>{this.setState({ selected: book.id })}}>{book.name}</li>)
    })
  }

  render() {
    //console.log(`Query result is: `, this.props)
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId = {this.state.selected}/>
      </div>
    );
  }

}

export default graphql(getBooksQuery)(BookList)
