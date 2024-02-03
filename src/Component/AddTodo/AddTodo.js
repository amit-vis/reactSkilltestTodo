// import all the required module and function here
import './AddTodo.css';
import { Form, Container, FormControl, Button, InputGroup } from "react-bootstrap";
import { useValue } from '../../ContextApi/contextAPI';

export function AddTodo() {
    const {postData, setPostData, handlePost, editData,handleUpdate} = useValue();
    console.log(postData)
    return (
        <>
        {/* form container and input form and submit button implement here */}
            <Container className="mt-2 w-50 mb-2 form-container">
                <Form className='pt-4 pb-4 w-100 d-flex justify-content-around m-auto' onSubmit={editData?handleUpdate:handlePost}>
                    <InputGroup className='w-75 input-text'>
                    <FormControl
                        placeholder="Enter Title"
                        value={postData}
                        onChange={(e)=>setPostData(e.target.value)}
                    />
                    </InputGroup>
                    <Button className='button' type='submit'>{editData? "Update": 'Add'}</Button>
                </Form>
            </Container>

        </>
    )
}