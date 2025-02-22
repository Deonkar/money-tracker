

import "./App.css";
import { useEffect, useState } from "react";


function App() {
  const [name,setName]= useState('');
  const [datetime,setDatetime] = useState('');
  const [description,setDescription]=useState('');
  useEffect(() => {
   getTransactions().then(setTransactions);
  }, []);


async function getTransactions(){
  const url = process.env.REACT_APP_API_URL+'/transactions';
  const response = await fetch(url);
  return await response.json();
  
}

  function addNewTransaction(ev){
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    const price = name.split(' ')[0];
    fetch(url,{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({
        price,
        name:name.substring(price.length+1),
        description,
        datetime})
    }).then(response =>{
      response.json().then(json=>{
        setName('');
        setDatetime('');
        setDescription('');
        console.log('result',json);
      });
    });
  }

  return (
    <main>
      <h1>
        $500<span>.00</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" 
          value={name}
          onChange={ev =>setName(ev.target.value)}
          placeholder={"+200 new samsung tv"} />
          <input value={datetime} 
          onChange={ev => setDatetime(ev.target.value)}
          type="datetime-local" />
        </div>
        <div className="description">
          <input type="text" value={description}
          onChange={ev => setDescription(ev.target.value)}
          placeholder={'description'} />
        </div>
        <button type="submit">Add new transaction</button>
        
      </form>
      <div className="transactions">
        <div className="transaction">
          <div className="left">
            <div className="name">New samsung Tv</div>
            <div className="description">time for new tv</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">2023-10-1 10:54</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">Gig job new website</div>
            <div className="description">time for new tv</div>
          </div>
          <div className="right">
            <div className="price green">+$400</div>
            <div className="datetime">2023-10-1 10:54</div>
          </div>
        </div>
        <div className="transaction">
          <div className="left">
            <div className="name">Iphone</div>
            <div className="description">time for new tv</div>
          </div>
          <div className="right">
            <div className="price red">-$900</div>
            <div className="datetime">2023-10-1 10:54</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
