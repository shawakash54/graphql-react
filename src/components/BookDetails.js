import React, { Component } from 'react';
import {graphql} from 'react-apollo'      //graphql is used to bind the query response to the component
import {getBookQuery} from '../graphql_queries'

class BookDetails extends Component {

  displayBookDetails(){
    const { book } = this.props.data
    if(book){
      return(
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by {book.author.name} :</p>
          <ul className="other-books">
            {
              book.author.books.map(item => {
                return <li key={item.id}>{item.name}</li>
              })
            }
          </ul>
        </div>
      )
    }else 
      return (<div>No Book Selected..</div>)
  }

  render() {
    return (
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    );
  }
}

//in order to get the data for a particular book, pass a variables object to the getBookQuery with the id of book
export default graphql(getBookQuery,{
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails)
