import React, {useState, useEffect} from "react";
import axios from 'axios';



function Todo (){
  
  const [task,setTask] = useState("");
  const [listTask, setlistTask] = useState([]);
  const [pokePoke, setpokePoke] = useState(null)

  const getData = async () => {
    const poke = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto")
    const pokeData = poke.data.sprites.back_default
    setpokePoke(pokeData)
  }
  
  // o primeiro é o componentDidMount()
    useEffect( () => { 
      getData()
      // console.log(poke.data)
    },[])

    //fica monitorando qualquer mudança no listTask que é o estado da minha lista de tarefas
    //o segundo é o componentDidUpdate()
    useEffect( () => {
      // setmsg(listTask.length)
      document.title = `Se liga no nº de tarefas: ${listTask.length}`
    },[listTask])
  
  //exemplo de const
// const handleChange = (event) =>{
//  setTask(event.target.value)
// }

const handleClick = (event) => {
  setlistTask([...listTask,{
    id: Date.now(),
    task: task
  }])
  setTask("")
  event.preventDefault() 
}

const removeTask = (id,event) => {
  setlistTask(listTask.filter((item) => {
    return item.id !== id
  }))
  event.preventDefault()
}
return(
  <form>
    <p>O seu total de tarefas é: {listTask.length}</p>
    <h2>ToDo</h2>
    <div className="box-add">
    <input value={task} onChange={(event)=>setTask(event.target.value)}/>
    <button className="button-add" onClick={handleClick}>Add</button>
    </div> 
      <ul>
      {listTask.map((item) => (
        <li><button className="button-add" onClick={(ev) => removeTask (item.id,ev)}>X</button>{item.task}</li>
        ))} 
      </ul>
      <div>
        <img src={pokePoke} alt="pokemón"/>
      </div>
  </form>
)
}

export default Todo;