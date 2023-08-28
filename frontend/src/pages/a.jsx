 <div className="tour_info">
                   <h2>{title}</h2>
                   <div className="d-flex align-items-center gap-5">
                     <span className="tour__rating d-flex align-items-center gap-1">
                       <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i> { avgRating === 0 ? null : avgRating}
                       {totalRating === 0 ? (
                         "Not rated"
                       ) : (
                         <span>({reviews.length})</span>
                       )}
                     </span>

                     <span>
                       <i className="ri-map-pin-user-fill"></i>{address}
                     </span>
                   </div>
                   <div className="tour_extra_details">
                    <span>
                       <i className="ri-map-pin-line"></i>{city}
                     </span>
                     <span>
                       <i className="ri-exchange-dollar-line"></i>${price}/per person
                     </span>
                     <span>
                       <i className="ri-map-pin-time-line"></i> {distance} k/m
                     </span>
                     <span>
                       <i className="ri-group-line"></i>{maxGroupSize} people
                     </span>
                   </div>
                 
                   <h5>Description</h5>
                   <p>{desc}</p>
                  

                 </div>
                   {/*========== tour reviews section =======*/}

                     <div className="tour_reviews mt-4">
                         <h4>Reviews({reviews?.length} reviews)</h4>
                         <Form onSubmit={submitHandler }>
                           <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                                 <span onClick={()=> setTourRating(1)}> 1 <i className="ri-star-s-fill"></i></span>
                                 <span onClick={()=> setTourRating(2)}> 2 <i className="ri-star-s-fill"></i></span>
                                 <span onClick={()=> setTourRating(3)}> 3 <i className="ri-star-s-fill"></i></span>
                                <span onClick={()=> setTourRating(4)}> 4 <i className="ri-star-s-fill"></i></span>
                                 <span onClick={()=> setTourRating(5)}> 5 <i className="ri-star-s-fill"></i></span>
                                 </div>
                                 <div className="review_point">
                                   <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required  />
                                   
                                    <button className='btn primary__btn text-white' type='submit'>
                                           submit 
                                    </button>
                                 </div>
                         </Form>

                         <ListGroup className='user_reviews'>
                           {
                             reviews?.map(review=>(
                               <div className="review_item">
                                 <img src={avatar} alt="" />

                                 <div className="w-100">
                                   <div className="d-flex align-items-center justify-content-between ">
                                     <div>
                                       <h5>Himanshu</h5>
                                       <p>
                                         {new Date('2023-01-18').toLocaleDateString("en-US", options)}
                                       </p>
                                     </div>
                                     <span className='d-flex align-items-center'>
                                            5 <i className="ri-star-s-fill"></i>
                                     </span>
                                   </div>
                                  <h6>Amazing Tour</h6>
                                 </div>
                               </div>
                             ))
                         }
                       </ListGroup>
                   </div>

                  {/*========== tour reviews end ========*/}

               