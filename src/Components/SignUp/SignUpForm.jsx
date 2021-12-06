import React,{useEffect, useState} from 'react';

export default function SignUpForm() {
  const [data, setData] = useState()
  const [formData, setFormData] = useState({
    userid:"",
    title:"",
    body:""
  });

  const handleGetData = () =>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(result => setData(result))
  }
  useEffect(() => {
    handleGetData();
    console.log("data",data)
  },[])

  const handleDelete = (item) =>{
    fetch(`https://jsonplaceholder.typicode.com/posts/${item}`, {
      method: 'DELETE',
    });
    handleGetData()
  }
  const handleChange =(e) =>{
      const value = e.target.value;
      setFormData({
        ...formData,
        [e.target.name]: value
      });
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": 101,
        "title": "fdsdfds",
        "body": "dfdsf",
        "userId": 123
      })
    })

  }
  return (
    <>
      <form style={{margin:"50px"}}>
        <input id="title" name="userid" value={formData.userid} onChange={handleChange} /> <br /> <br />
        <input id="title" name="title" value={formData.title} onChange={handleChange} /> <br /> <br />
        <input id="body" name="body" value={formData.body} onChange={handleChange} /> <br /> <br />
        <button onClick={handleSubmit}>add</button>
      </form>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>title</th>
            <th>body</th>
            <th>userId</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.map((item)=>
              <tr>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>{item.userId}</td>
                <td>
                  <button onClick={()=>handleDelete(item.id)}>Delete</button>
                </td>
              </tr> 
            )
          }
        </tbody>
      </table>
    </>
  );
}
