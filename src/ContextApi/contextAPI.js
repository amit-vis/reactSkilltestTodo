// import all required module
import { createContext, useContext, useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'

// create the itemContext
const itemContext = createContext();

// implement the use Value function
export function useValue(){
    const value = useContext(itemContext);
    return value;
}

// create the CustomItemContext function
function CustomItemContext({children}){
    const [data, setData] = useState([]);
    const [postData, setPostData] = useState('');
    const [editData, setEditData] = useState(null);
    const [filterData, setFiltedData] = useState([]);
    const [selectFilter, setSelectFilter] = useState('all');

    // handle the filter feature here
    useEffect(()=>{
        if(selectFilter === 'all'){
            setFiltedData(data)
        }else{
            const selectedFilter = data.filter((task)=> task.completed === (selectFilter==='completed'))
            setFiltedData(selectedFilter)
        }
    },[selectFilter, data])

    // taggle the checked task
    const ToggleChecked = (id) => {
        setData((prevState) =>
          prevState.map((item) => {
            if (item.id === id) {
              const updatedItem = { ...item, completed: !item.completed };
            //   show the status according to the action
              if (updatedItem.completed) {
                toast.success("Task marked as completed");
              } else {
                toast.info("Task marked as incomplete");
              }
              return updatedItem;
            } else {
              return item;
            }
          })
        );
      };

    //   handle post functionality here
    async function handlePost(e){
        e.preventDefault();
        try {
            if(postData.trim()===""){
                return
            }
            const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: postData,
                completed: false
            })
        })
        const jsonData = await response.json()
        setData((prevState)=>[...prevState, jsonData])
        setPostData("")
        // show the message here
        toast.success("Task Added Successfully!")
            // handle error which getting from the server
        } catch (error) {
            console.log("Error in posting data", error)
            toast.error("Error in adding data")
            
        }
    }
// implemented deleted functionality here
    const handleDelete = async (id)=>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
                method: 'DELETE'
            })
            if(response.ok){
                setData((prevData)=> prevData.filter((item)=> item.id !== id))
            }
            toast.success('Task deleted successfully!')
        } catch (error) {
            console.log("Error in delete function", error)
            toast.error("Error in deleting data")
        }
    }

    // handle the edit text
    const handleEdit = (id)=>{
        setEditData(id)
        const findIndex = data.find((index)=>index.id===id)
        setPostData(findIndex.title)
    }

    // handle the update functionality here
    const handleUpdate = async (e) => {
        try {
            if(postData.trim()===""){
                return
            }
            e.preventDefault()
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${editData}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    title: postData,
                    completed: false
                }),
            });
            const jsonUpdatedTask = await res.json();
            setData((prevTasks)=>
                prevTasks.map((item)=>item.id === editData? {...item, title: jsonUpdatedTask.title}: item));
                setPostData('')
                setEditData(null)
                toast.success("Task Updated Successfully!")

        } catch (error) {
            console.log("Error in updating data", error)
            toast.error("Error in updating data!")
        }
    };    
    
    // fetch the data from the api
    useEffect(()=>{
        async function fetchData(){
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const jsonData = await response.json();
            setData(jsonData)
        }
        fetchData()
    },[])

    // export the required functionality here
    return(
        <itemContext.Provider value={{data, 
        ToggleChecked, 
        postData, 
        setPostData,
        handlePost,
        handleDelete, 
        handleUpdate,
        handleEdit, 
        editData,
        filterData,
        selectFilter, 
        setSelectFilter
        }}>
            {children}
        </itemContext.Provider>
    )
}

export default CustomItemContext;