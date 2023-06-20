import React, { useEffect, useState } from "react";
import axios from "axios"
import { Link, useParams } from "react-router-dom";

// When a phone model is selected from the list, a detailed view of the phone is shown with a few specific details displayed. This display should be on the same page than the list of phones.
// Show a spinner component or a position marker while the API request is processing (display a simulation if there is no loading time)

function App() {
  const [phones, setPhones] = useState(null);
  const { id } = useParams()
  const [onePhone, setOnePhone] = useState()

  const getAllPhones = async () => {
    try {
      const response = await axios.get("http://localhost:3000/phones", {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }});
      setPhones(response.data);
    } catch (error) {
      console.log("error from app when fetching phones data", error);
    }
  };

  async function displayInformation (id) {

  try {
    console.log("into getOnePhone")
    const response = await axios.get(`http://localhost:3000/phones/${id}`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }});
       setOnePhone(response.data);
  } catch (error) {
    console.log("error when retrieving one phone", error)
  }
  }

useEffect(() => {
    getAllPhones();
  }, []);

if (!phones) {    
  return <div>Data loading, please wait</div>;
}

  console.log("this your phones", phones);
  console.log("this is one phone", onePhone)

  return (
    <>
    <div>
      <h1>Our phones</h1>
      <ol>
        {phones.map((phone) => {
          return <li key={phone.id}><Link onClick={() => displayInformation(phone.id)}>{phone.name}</Link></li>;
        })}
      </ol>
    </div>
{onePhone?
    <div>
      <h2>{onePhone.name}</h2>
      <h3>{onePhone.manufacturer}</h3>
      <p>{onePhone.description}</p>
      <p>{onePhone.processor}</p>
      <p>{onePhone.ram}</p>
      <p>{onePhone.screen}</p>
      <p>{onePhone.price}</p>
      <img src={onePhone.imageFileName} alt="image of a smartphone"/>
      
    </div>
    : <p>click on a phone in the list to display information</p>
  }
    </>
  );
}

export default App;
