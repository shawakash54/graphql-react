import {gql} from 'apollo-boost'

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
` 

export default getBooksQuery