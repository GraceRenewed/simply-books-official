/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { viewAuthorDetails } from '@/api/mergedData';
import BookCard from '@/components/BookCard';
import { getAuthorBooks } from '../../../api/authorData';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});
  const [books, setBooks] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
    getAuthorBooks(firebaseKey).then(setBooks);
  }, [firebaseKey]);

  const getSpecificBooks = () => {
    getAuthorBooks(firebaseKey).then(setBooks);
  };

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.first_name} {authorDetails.last_name}
          <h6>
            {authorDetails.email}
            {authorDetails.favorite ? ' 🤍' : ''}
          </h6>
        </h5>
        <h6>
          {books.map((book) => (
            <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getSpecificBooks} />
          ))}
        </h6>
      </div>
    </div>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
