import './App.css';
import {useState} from 'react';
import Axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [employList, setEmployList] = useState([])

  const displayInfo = () =>{
    console.log('Success: ' + name + age + country + position + wage)
  }

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age, 
      country: country, 
      position: position, 
      wage: wage
    }).then(() => {

      //When we add an employ, automatically update the employList
      setEmployList([...employList,{
        name: name,
        age: age, 
        country: country, 
        position: position, 
        wage: wage}])
        
      displayInfo()
    })
  };

  const getEmployees = () =>{
    Axios.get('http://localhost:3001/employees').then((response) => {
        setEmployList(response.data);
        console.log(response);
    })
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input type="text" onChange={(event)=>{setName(event.target.value)}}/>
        <label>Age:</label>
        <input type="number" onChange={(event)=>{setAge(event.target.value)}}/>
        <label>Country</label>
        <input type="text" onChange={(event)=>{setCountry(event.target.value)}}/>
        <label>Position</label>
        <input type="text" onChange={(event)=>{setPosition(event.target.value)}}/>
        <label>Wage (annually):</label>
        <input type="number" onChange={(event)=>{setWage(event.target.value)}}/>
        <button className="btn" onClick={addEmployee}>Add Employee</button>
      </div>

      <div className="employees">
        <button className="btn" onClick={getEmployees} >Show Employees</button>
        {employList.map((val, key)=>{
          return <div className="employee">
                  <h3>Name: {val.name}</h3>
                  <h3>Age: {val.age}</h3>
                  <h3>Country: {val.country}</h3>
                  <h3>Position: {val.position}</h3>
                  <h3>Wage: {val.wage}</h3>
                </div>
        })}
        
      </div>
    </div>
  );
}

export default App;
