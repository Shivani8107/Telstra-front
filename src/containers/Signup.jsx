import   {
  useState }  from "react";
import FormInput from "./FormInput";



import axios from "axios";

const Signup = () => {
  const [values, setValues] = useState({
    FullName: "",
    email: "",
    password: "",
    ConfirmPassword:"",
  });
  const [status, setStatus] = useState(null);
  const [resp, setResponse] = useState(null);
  const [err, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputs = [
    
    {
      id: 1,
      name: "Full Name",
      type: "text",
      placeholder: "Full Name",
      errorMessage:
        "Full Name should be 3-16 characters and shouldn't include any special character!",
      label: "Full Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
  
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters with atleast 1(letter,number and special character!)",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmpassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage:
        " Password don't match",
      label: "confirm Password",
      pattern: values.password,
      required: true,
      
    },
  
  ];

  


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target[1].value
    const username = e.target[0].value
    const password = e.target[2].value
    const confirm_password = e.target[3].value
    const data = {email,username,password,confirm_password}
    console.log(data)
    axios.post('', data)
    .then(response => {
      console.log(response)
      setStatus('Success')
      setResponse(response.data.message)
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data.message);
      setStatus('error')
      setError(error.response.data.message)
      setIsLoading(false)
    });
    // setIsLoading(false)
    console.log(resp)
  
    
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
 

  return (
    <div className="App">
         <div className='card'  style={{width:'500px',height:'540px',marginLeft:'510px',marginTop:'60px', borderRadius: '30px'}}>
      <form onSubmit={handleSubmit}>
      <h1 style={{ marginTop: '20px', marginLeft: '45px', fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: '25px'}}>Create Account</h1>
      <div style={{ marginLeft: '0px' }}>
  {inputs.map((input) => (
    <FormInput
      key={input.id}
      {...input}
      value={values[input.name]}
      onChange={onChange}
      style={{ marginBottom: '10px', fontFamily: 'Exo, Sans-serif', color: 'black' }}
    />
  ))}
</div>
       
<button disabled={isLoading} style={{ height: '50px', width: '60%', marginTop:'10px',marginRight: '100px', backgroundColor: '#45B3CF', borderRadius: '15px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <a href="/login" style={{ color: 'white', fontSize: '20px',fontFamily: 'Inter, sans-serif', fontWeight: '800', textDecoration: 'none' }}>
    {isLoading ? 'Loading...' : 'Sign Up'}
  </a>
</button>

<div className="buttons" style={{ marginTop: '90px', marginLeft: '20px', backgroundColor: 'white' }}>
<p style={{ marginTop: '10px', textAlign: 'center', fontSize:'16px', fontFamily: 'Exo, sans-serif',color: '#A9A9A9',}}>
    Already have an Account? 
    <a href="/login" style={{ fontSize: '16px', fontFamily: 'Exo, sans-serif', color: '#45B3CF', marginLeft: '5px', textDecoration: 'none' }}>Login</a>
  </p>
  <a href="/" style={{ color: 'black', fontFamily: 'Inter, sans-serif', fontWeight: '550', fontSize: '20px', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
    <i class="fa fa-arrow-circle-o-left" style={{ marginLeft: '15px' }}></i> Back</a>
  
</div>

      </form>
      {status === 'Success' && <div>{resp}</div>}
      {status === 'error' && <div>{err}</div>}
      
</div>
    </div>
  );
};

export default Signup;
