// import React,{useEffect,useRef, useState} from 'react'
// import '../styles/tour-details.css'
// import { Container, Row, Col, Form,  ListGroup } from 'reactstrap'
// import { useParams } from 'react-router-dom'

// import calculateAvgRating from '../utils/avgRating'
// import avatar from "../assets/images/avatar.jpg"
// import Booking from '../components/Booking/Booking'
// import Newsletter from '../shared/Newsletter'
// import { BASE_URL } from './../utils/config'
// import useFetch from './../hooks/useFetch'
// const TourDetails = () => {

//   const { id } = useParams();
//   const reviewMsgRef = useRef("");
//   const [tourRating, setTourRating] = useState(null);

//   // This is static data; later, we will call our API and load data from the database.
//   // const { data: tour } = useFetch(`${BASE_URL}/tours/${id}`);
//   // const { data: tour } = useFetch(`${BASE_URL}/tours/${id}`, 'GET');
//   const { data:tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`, 'GET');







//   //destructure properties from tour object
//   const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour;
//   const { totalRating, avgRating } = calculateAvgRating(reviews);

//   //formate date
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };

//   //submit request to the server
//   const submitHandler = e=>{
//      e.preventDefault();
//      const reviewText= reviewMsgRef.current.value;
//   };
//   useEffect(()=>{
//     window.scrollTo(0,0);

//   },[])


//   return (
//     <>
//       <section>
//         <Container>
//           <Row>
//             <Col lg="8">
//               <div className="tour_content">
//                 <img src={photo} alt="" />
//                 <div className="tour_info">
//                   <h2>{title}</h2>
//                   <div className="d-flex align-items-center gap-5">
// <span className="tour__rating d-flex align-items-center gap-1">
//   <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i> { avgRating === 0 ? null : avgRating}
//   {totalRating === 0 ? (
//     "Not rated"
//   ) : (
//     <span>({reviews.length})</span>
//   )}
// </span>

// <span>
//   <i className="ri-map-pin-user-fill"></i>{address}
// </span>
//                   </div>
//                   <div className="tour_extra_details">
//                     <span>
//                       <i className="ri-map-pin-line"></i>{city}
//                     </span>
//                     <span>
//                       <i className="ri-exchange-dollar-line"></i>${price}/per person
//                     </span>
//                     <span>
//                       <i className="ri-map-pin-time-line"></i> {distance} k/m
//                     </span>
//                     <span>
//                       <i className="ri-group-line"></i>{maxGroupSize} people
//                     </span>
//                   </div>

//                   <h5>Description</h5>
//                   <p>{desc}</p>


//                 </div>
//                   {/*========== tour reviews section =======*/}

//                     <div className="tour_reviews mt-4">
//                         <h4>Reviews({reviews?.length} reviews)</h4>
//                         <Form onSubmit={submitHandler }>
//                           <div className="d-flex align-items-center gap-3 mb-4 rating_group">
//                                 <span onClick={()=> setTourRating(1)}> 1 <i className="ri-star-s-fill"></i></span>
//                                 <span onClick={()=> setTourRating(2)}> 2 <i className="ri-star-s-fill"></i></span>
//                                 <span onClick={()=> setTourRating(3)}> 3 <i className="ri-star-s-fill"></i></span>
//                                 <span onClick={()=> setTourRating(4)}> 4 <i className="ri-star-s-fill"></i></span>
//                                 <span onClick={()=> setTourRating(5)}> 5 <i className="ri-star-s-fill"></i></span>
//                                 </div>
//                                 <div className="review_point">
//                                   <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required  />

//                                    <button className='btn primary__btn text-white' type='submit'>
//                                           submit 
//                                    </button>
//                                 </div>
//                         </Form>

//                         <ListGroup className='user_reviews'>
//                           {
//                             reviews?.map(review=>(
//                               <div className="review_item">
//                                 <img src={avatar} alt="" />

//                                 <div className="w-100">
//                                   <div className="d-flex align-items-center justify-content-between ">
//                                     <div>
//                                       <h5>Himanshu</h5>
//                                       <p>
//                                         {new Date('2023-01-18').toLocaleDateString("en-US", options)}
//                                       </p>
//                                     </div>
//                                     <span className='d-flex align-items-center'>
//                                            5 <i className="ri-star-s-fill"></i>
//                                     </span>
//                                   </div>
//                                   <h6>Amazing Tour</h6>
//                                 </div>
//                               </div>
//                             ))
//                           }
//                         </ListGroup>
//                     </div>

//                   {/*========== tour reviews end ========*/}

//               </div>
//             </Col>
//             <Col lg='4'>
//               <Booking tour={tour} avgRating={avgRating} />
//             </Col>

//           </Row>
//         </Container>
//       </section>
//       <Newsletter />
//     </>
//   )
// }

// export default TourDetails;

import React, { useEffect, useRef, useState } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios library
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import { BASE_URL } from './../utils/config';

const TourDetails = () => {
  // Get the tour ID from the URL parameters
  const { id } = useParams();

  // Create a reference to the review message input
  const reviewMsgRef = useRef('');

  // State to store the tour rating
  const [tourRating, setTourRating] = useState(null);

  // State to store the fetched tour data
  const [tour, setTour] = useState({});

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // State to manage error status
  const [error, setError] = useState(null);

  // UseEffect to fetch tour data when the component mounts
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch tour data using Axios
    axios.get(`${BASE_URL}/tours/${id}`)
      .then((response) => {
        setTour(response.data); // Set fetched data
        setLoading(false);     // Set loading to false
      })
      .catch((error) => {
        setError(error);        // Set error
        setLoading(false);     // Set loading to false
      });
      console.log("tour data");
      console.log(tour.data);
    // const response= axios.get(`${BASE_URL}/tours/${id}`);
    // setTour(response.data);

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, [id]);

  // Handle loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Destructure tour data
  // const {
  //   photo,
  //   title,
  //   desc,
  //   price,
  //   address,
  //   reviews,
  //   city,
  //   distance,
  //   maxGroupSize,
  // } = tour;

  // Calculate totalRating and avgRating
  const { totalRating, avgRating } = calculateAvgRating(tour.data.reviews);

  // Format options for date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Handle review submission
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    // Process the review submission here
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour_content">
                <img src={tour.data.photo} alt="" />
                <div className="tour_info">
                  <h2>{tour.data.title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    {/* Rest of the JSX for rating and address */}
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i> {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not rated"
                      ) : (
                        <span>({tour.data.reviews.length})</span>
                        // <span>5</span>
                      )}
                    </span>

                    <span>
                      <i className="ri-map-pin-user-fill"></i>{tour.data.address}
                    </span>

                  </div>
                  <div className="tour_extra_details">
                    {/* Rest of the JSX for extra details */}
                    <span>
                      <i className="ri-map-pin-line"></i>{tour.data.city}
                    </span>
                    <span>
                      <i className="ri-exchange-dollar-line"></i>${tour.data.price}/per person
                    </span>
                    <span>
                      <i className="ri-map-pin-time-line"></i> {tour.data.distance} k/m
                    </span>
                    <span>
                      <i className="ri-group-line"></i>{tour.maxGroupSize} people
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{tour.data.desc}</p>
                </div>

              </div>
            </Col>
            <Col lg='4'>
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;

