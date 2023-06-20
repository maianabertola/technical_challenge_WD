import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"
import "./App.css"

// When a phone model is selected from the list, a detailed view of the phone is shown with a few specific details displayed. This display should be on the same page than the list of phones.
// Show a spinner component or a position marker while the API request is processing (display a simulation if there is no loading time)

function App() {
  const [phones, setPhones] = useState(null);
  const { id } = useParams()
  const [onePhone, setOnePhone] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const getAllPhones = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:3000/phones", {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }});
      setPhones(response.data);
      setLoading(false)
    } catch (error) {
      console.log("error from app when fetching phones data", error);
    }
  };

  const displayInformation = async (id) => {
    setLoading(true)

  try {
    console.log("into getOnePhone")
    const response = await axios.get(`http://localhost:3000/phones/${id}`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }});
       setOnePhone(response.data);
       setLoading(false)

  } catch (error) {
    console.log("error when retrieving one phone", error)
  }
  }

useEffect(() => {
    getAllPhones();
  }, []);

  useEffect(() => {
    displayInformation(id)
  }, [id])

if (isLoading) {    
  return <>
  <div style={{margin: '0 auto'}}>
  <ClipLoader color="hsla(223, 67%, 53%, 1)"  size={145} />
  </div>
  </>
} 

  return (
    <>
    {!isLoading && 
      <div className="container">
    <div className="list">
      <ol>
        {phones.map((phone) => {
          return <li key={phone.id}><Link className="link" onClick={() => displayInformation(phone.id)}>{phone.name}</Link></li>;
        })}
      </ol>
    </div>
{onePhone?
    <div className="phoneDetails">
      <div className="imgContainer">
      <img src={`../images/${onePhone.imageFileName}`} alt="pic of a smartphone"/>
      </div>
      <div className="flexTitle">
       <div className="flexInfo">
        <h2>{onePhone.name}</h2>
        <h3>by {onePhone.manufacturer}</h3>
        </div>
       <p style={{margin: 1 + "vh", fontSize: 2 +"rem"}}>{onePhone.price}€</p>
      </div>
      <hr></hr>
      <div className="flexInfo">
      <p className="keyInfo">{onePhone.ram} rams</p>
      <p className="keyInfo">Screen: {onePhone.screen}</p>
      <p className="keyInfo">Processor: {onePhone.processor}</p>
      </div>
      <hr></hr>
     
      <p>{onePhone.description}</p>
    </div>
    : <div className="cta">
    <p style={{fontStyle: "italic", textAlign:"center"}}>Click on a phone in the list to display information</p>
    </div>
  }
  </div>
}
    </>
  );
}

export default App;
