import {gql} from "apollo-server"

export const homePageQuery= gql`
fragment Book on Book{
  id
  title
  description
  rating
}

fragment Rating on Review{
  id
  rating
  title
  comment
  users {
      name
  }
}

query HomePageQuery($booksOrderBy: BookSorting) {
  books(orderBy: $booksOrderBy){
    ...Book
    authors {
      name
    }
    imageUrl
  }
  reviews {
    ...Rating
    books {
      ...Book
      imageUrl(size: SMALL)
    }
    
  }
}
`;