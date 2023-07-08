import { useState, useRef, useEffect } from 'react';
import { BsPlusLg } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";
import './TodoList.css';
import { FiEdit2 } from "react-icons/fi";
import { addTodoApi, deleteTodoApi, editTodoApi, fetchTodos } from '../services/user';
import { toast } from "react-toastify";
import { string } from 'yup';
import { useNavigate } from 'react-router-dom';


type Todo = {
  _id: string,
  userId: string,
  text: string,
  status: boolean
}


function TodoList() {

  const [text, setText] = useState('');
  const [todo, setTodo] = useState<Todo[]>([]);
  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    //checking token
    const token = localStorage.getItem('jwtToken');
    if (!token) navigate('/');

    //fetching data
    fetchTodos()
      .then((response) => {
        setTodo(response.data.todos);
      })
      .catch((err) => {
        toast.error(err.error.message, {
          position: "top-center",
        });
      })
    inputRef.current?.focus();
  }, [])


  //add todo
  function addTodo(text: string) {
    setText('');
    if (text) {
      addTodoApi({ text, status: false })
        .then((response) => {
          if (response.data?.newTodo) {
            setTodo([...todo, response.data?.newTodo])
          }
        })
        .catch((err) => {
          toast.error(err.error.message, {
            position: "top-center",
          });
        })
    }
  }

  //edit todo
  function editTodo(id: string, text: string, status: boolean) {
    if (status) {
      editTodoApi(id, text)
        .then((response) => {
          if (response.data.status) {
            setTodo(todo.filter((obj2) => {
              if (id == obj2._id) {
                obj2.status = false;
              }
              return obj2;
            }))

            toast.success("Updated", {
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          toast.error(err.error.message, {
            position: "top-center",
          });
        })
    }
  }


  //Delete todo
  function deleteTodo(id: string) {
    deleteTodoApi(id)
      .then((response) => {
        if (response.data?.status) {
          setTodo(todo.filter((obj2) => id != obj2._id))
        }

        toast.success(response.data.message, {
          position: "top-right",
        });

      })
      .catch((err) => {
        toast.error(err.error.message, {
          position: "top-center",
        });
      })
  }



  return (
    <div className="app d-flex justify-content-center align-items-center flex-column">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="input">
        <input type="text"
          ref={inputRef}
          onChange={(e) => { setText(e.target.value) }}
          value={text}
          placeholder="🖊️ Add item..." />
        <i className="fas fa-plus"
          onClick={() => { addTodo(text) }}
        ><BsPlusLg /></i>
      </div>



      {/* todo listing */}
      <div className="todos">
        {
          todo.map((obj, key) => {
            return (
              <div key={key} className="todo input">
                <div className="left  m-0">
                  <input type="text" className='m-0'
                    onChange={(e) => {
                      setTodo(todo.filter((obj2) => {
                        if (obj._id == obj2._id) {
                          obj2.text = e.target.value;
                        }
                        return obj2;
                      }))
                    }}


                    // saving
                    onBlur={(e) => { editTodo(obj._id, e.target.value, obj.status) }}
                    value={obj.text} readOnly={!obj.status} />
                </div>
                <div className="right flex">

                  {/* edit */}
                  <div className='mr-4'>
                    <FiEdit2
                      onClick={() => {
                        setTodo(todo.filter((obj2) => {
                          if (obj._id == obj2._id) {
                            obj2.status = true;
                          }
                          return obj2;
                        }))
                      }}
                      className='text-yellow-400'
                    />
                  </div>

                  {/* delete */}
                  <IoTrashBin
                    onClick={() => { deleteTodo(obj._id) }}
                    className="text-red-700 me-2" />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default TodoList