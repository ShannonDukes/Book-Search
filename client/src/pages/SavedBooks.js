import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { removeBookId } from '../utils/localStorage';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';

const SavedBooks = () => {

    const { loading, data } = useQuery(GET_ME);
    const [deleteBook] = useMutation(DELETE_BOOK);

    const userData = data?.me || {}

    // create function that accepts the book's mongo_id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {
        try {
            await deleteBook({
                variables: { bookId },
                refetchQueries: [{ query: GET_ME }]
            })
            // upon success, remove book's id from localStorage
            removeBookId(bookId);
        } catch (err) {
            console.error(err);
        }
    };

    // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;