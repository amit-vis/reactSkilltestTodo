// import all imported module and function here
import './App.css';
import { AddTodo } from './Component/AddTodo/AddTodo';
import { NavbarPage } from './Component/Navbar';
import { ShowTodo } from './Component/showTodoList/ShowTodoList';
import CustomItemContext from './ContextApi/contextAPI';

function App() {
  return (
    <div className="App">
      <CustomItemContext>
        {/* show all the required component here */}
        <NavbarPage/>
        <AddTodo/>
        <ShowTodo/>
      </CustomItemContext>
    </div>
  );
}

export default App;
