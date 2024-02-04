// import all the required module and function here
import { useValue } from "../../ContextApi/contextAPI";
import './ShowTodoList.css';
import { ToastContainer } from "react-toastify";

export function ShowTodo() {

    const { ToggleChecked,handleDelete,handleEdit,filterData,selectFilter, setSelectFilter } = useValue();
    return (
        <>
            <h1>Todo List</h1>
            {/* filter container */}
            <div className="filter-container">
                <label className="select-label" for="Select-task">Select Filter:-</label>
                <select id="Select-task" value={selectFilter} onChange={(e)=>setSelectFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Not-Completed</option>
                </select>
            </div>
            {/* todo task List container */}
            <ul className="todo-container">
            {filterData.map((todo) => (
                    <li className="list-item" key={todo.id}>
                        <input type="checkbox"
                            className={todo.completed ? 'check-box-vis' : 'check-box'}
                            checked={todo.completed} onChange={() => ToggleChecked(todo.id)} />
                        <span>{todo.title}</span>
                        <div className="icon-container">
                        <img src="https://cdn-icons-png.flaticon.com/128/5676/5676047.png"
                            alt="delete-Icon"
                            width={25}
                            height={25}
                            onClick={()=> handleDelete(todo.id)}
                        />
                        <img src="https://cdn-icons-png.flaticon.com/128/505/505159.png"
                        alt="Edit Icon" width={25} height={25}
                        onClick={()=> handleEdit(todo.id)} />
                        </div>
                    </li>
            ))}
        </ul>
        <ToastContainer/>
        </>
    )
}