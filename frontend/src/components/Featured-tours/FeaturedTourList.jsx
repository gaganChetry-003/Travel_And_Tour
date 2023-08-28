import React from 'react'
import TourCard from '../../shared/TourCard'

import {Col} from 'reactstrap'
import useFetch from './../../hooks/useFetch';
import {BASE_URL} from './../../utils/config';

const FeaturedTourList = () => {
  const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);

 // Add this line to check the value of loading

  return (
    <>
      {/* Check the value of loading */}
      {loading && <h4>Loading...........</h4>}
      
      {/* Check for errors */}
      {error && <h4>{error}</h4>}
      
      {/* Render tour cards if loading is false and there's no error */}
      {!loading && !error && 
        featuredTours?.map(tour => (
          <Col lg='3' className='mb-4' key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))}
    </>
  );
};


export default FeaturedTourList;
