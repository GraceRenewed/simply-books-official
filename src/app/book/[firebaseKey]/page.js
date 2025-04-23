/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import { viewBookDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function ViewBook({ params }) {
  const [bookDetails, setBookDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewBookDetails(firebaseKey).then(setBookDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={bookDetails.image} alt={bookDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {bookDetails.title} by {bookDetails.authorObject?.first_name} {bookDetails.authorObject?.last_name}
          {bookDetails.authorObject?.favorite ? ' 🤍' : ''}
        </h5>
        <Link href={`/author/${bookDetails.authorObject?.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <p>{bookDetails.description || ''}</p>
        <hr />
        <p>{bookDetails.sale ? `🏷️ Sale $${bookDetails.price}` : `$${bookDetails.price}`}</p>
      </div>
    </div>
  );
}

ViewBook.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
