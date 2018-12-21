import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo'      //graphql is used to bind the query response to the component
//compose method is used to bind more than one graphql query, mutation to the component.
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../graphql_queries'

class AddBook extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    }
  }

  displayAuthors(){
    //var data = this.props.data    //since we named it below, so tha data won't be in props.data but in the name
    var data = this.props.getAuthorsQuery
    return data.loading ? <option>Loading authors..</option> : data.authors.map( author => {
      return(<option key={author.id} value={author.id}>{author.name}</option>)
    })
  }

  submitForm(e){
    e.preventDefault()
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{query: getBooksQuery}]    //after running the mutation, refetch the data.
                                                  //Since data is more now, it will re render the BookList component
    })
  }

  render() {
    return (
      <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
        <div className="field">
          <label>Book Name:</label>
          <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({authorId: e.target.value})}>
            <option>Select an author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
  
}

//export default graphql(getAuthorsQuery)(AddBook)
export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)
