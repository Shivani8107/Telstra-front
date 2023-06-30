
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";
import { addToCart } from "../redux/reducers/cartSlice";
import Review from './Review'
import ReactStars from "react-rating-stars-component";
import { MDBIcon } from 'mdbreact';
const ProductDetails = () => {
  const { productId } = useParams();
  const history = useHistory();
  const selected_products = useSelector((state) => state.product);
  const firstproduct = selected_products[0];
  const { category, description,brand, image, name, p_id, price} = firstproduct || { };
  const dispatch = useDispatch();
  const [productID, setProductID] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [message, setMessage] = useState('')
  
  const handleAddToCart = (firstproduct) => {
    dispatch(addToCart(firstproduct));
    //history.push("/cart");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsSubmitted(true);
    setProductID(productID)
    console.log(rating)
    console.log(review)
    console.log(name)
    const data = { p_id, name, review, rating };
    fetch('http://localhost:5000/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json(),
    data => console.log(data),
    setIsSubmitted(true),
    console.log(data),
    setTimeout(() => {
      window.location.reload();
    }, 2000)
    )
    .catch(error => console.error(error));
  }
  
  const fetchProductDetail = async (productId) => {
    const response = await axios
      .get(`http://localhost:5000/products/${productId}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };


  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };// eslint-disable-next-line
  }, [productId]);
  return (
    <div className="ui grid container" >
    {Object.keys(selected_products).length === 0 ? (
      <div>...Loading</div>
    ) : (
      <div>

        {/* Render current product card */}
        <div><h1 class="card-title" style={{fontFamily: "'Sofia Sans Condensed', 'sans-serif'", fontSize: '30px', marginBottom:'20px'}}>{category}-{name}</h1></div>
        <div class="card mb-3"  style={{ height: '500px',display:'flex', justifyContent:'center', borderRadius:'20px',padding:'30px'}}>
          <div class="row g-0" style={{}}>
            <div class="col-md-4">
            <img className="ui fluid image" style={{height: "100%", width: "100%", objectFit: "cover", objectPosition: "center",}} src={image} alt="img" />
            </div>
            <div class="col-md-8">
              <div class="card-body" style={{display:'flex', flexDirection: 'column' ,justifyContent: 'left', alignContent:'flex-start', alignSelf: 'flex-start',marginLeft:'30px'}}>
                <h1 class="card-title" style={{fontFamily: 'Sora', fontSize: '30px', marginBottom:'10px'}}>{brand}</h1>
                <h1 class="card-title" style={{fontFamily: 'Sora', fontSize: '30px', marginBottom:'50px'}}>{name}</h1>
                <p class="card-text" style={{marginBottom:'40px', fontFamily:'Sora', fontWeight: '300px'}}>
                {description}
                </p>
                <h2 style={{marginBottom:'30px', fontFamily:'Sora', fontWeight: '300px', fontSize:'30px'}}>
                    {price}
                </h2>
                <div style={{display:'flex', justifyContent:'center'}}> 
                <button style={{ width:'300px',height:'50px', border: 'None', marginRight:'20px', backgroundColor: '#1CBD97', borderRadius:'10px'}}><a href='/'  style={{color:'white', textDecoration:'None', fontFamily: "'Sofia Sans'", fontSize: '25px', fontWeight: '400px'}}><MDBIcon style={{fontSize:'20px',color:'#000000'}} className='me-4' icon='fire' />Buy Now</a></button>
                <button style={{
    width: '300px',
    height: '50px',
    border: 'none',
    marginLeft: '20px',
    backgroundColor: '#DDCB26',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: "'Sofia Sans'",
    fontSize: '25px',
    fontWeight: '400px',
    cursor: 'pointer'
  }} onClick={() => handleAddToCart(firstproduct)}
>
  <MDBIcon style={{ fontSize: '20px', color: '#000000', marginRight: '10px' }} className="me-4" icon="shopping-cart" />
  Add To Cart
</button>


                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div><h1 class="card-title" style={{fontFamily: "'Sofia Sans Condensed', 'sans-serif'", fontSize: '30px', marginBottom:'10px', marginTop:'30px'}}>Similar Products You May Like</h1></div>
        <div className="ui stackable three column grid">
          {/* Get array of product objects from selected_products */}
          {Object.values(selected_products)
            .slice(1) // Skip the first product
            .map(product => (
              <div className="four wide column" key={product.p_id}>
        <Link to={`/products/${product.p_id}`} className="Link">

          <div className="ui link cards">
            <div className="card" style={{width:'600px' ,borderRadius: '30px', padding: '10px' }}>
              <div className="image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="content">
                <div className="header" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '700', fontSize: '20px' }}>{product.brand}</div>
                <div className="header" style={{background:'white',fontFamily:'Poppins, sans-serif',fontWeight:'900',fontSize:'20px'}}>{product.name}</div>
                <div className="meta price" style={{marginTop:'10px', background:'white',fontFamily:'Poppins, sans-serif',fontWeight:'300',fontSize:'20px'}}>{product.price}</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      
            ))}
        </div>
      </div>
   
      
    )}
    <div style={{marginTop: '40px', width: '100%'}}>
  <div class="card">
  <div class="card-header" style={{fontFamily: "'Sofia Sans Condensed', 'sans-serif'", fontSize: '30px'}}>Add Your Review</div>
  <div class="card-body" style={{display:'flex', flexDirection:'column'}}>
    <h5 class="card-title" style={{fontFamily:'Sora', fontWeight: '300px'}}>Rate the product</h5>
    <ReactStars
      count={5}
      onChange={(e) => setRating(e)}
      size={24}
      activeColor="#ffd700"
    />
    <h5 class="card-text" style={{fontFamily:'Sora', fontWeight: '300px', marginTop:'10px'}}>Review</h5>
    <div class="form-outline">
      <input type="text" id="typeText" class="form-control" style={{maxWidth:'30%'}} value={review} onChange={(e) => setReview(e.target.value)} />
    </div>
    <button style={{ width:'170px',height:'50px', border: 'None', marginTop:'30px', backgroundColor: '#109DC1', borderRadius:'10px'}} onClick={handleSubmit}> Submit </button>
    {isSubmitted && <p style={{color: 'green', marginTop: '10px'}}>Review added successfully!</p>}          
  </div>
</div>
</div>
<div style={{marginTop: '40px', width: '100%'}}> <Review productId={productId}></Review> </div>
  </div>
  
  );
};

export default ProductDetails;