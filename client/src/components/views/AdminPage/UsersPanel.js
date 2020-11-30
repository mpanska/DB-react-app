import React,  { useEffect, useState }  from 'react';
import Axios from 'axios';
import { Collapse, Button, Form, Input } from 'antd';
import { Formik } from 'formik';
import { registerUser, updateUser } from "../../../_actions/user_actions";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
const { Panel } = Collapse

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
};
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
};


function UsersPanel(props) {
  const dispatch = useDispatch()

  //-----------------------------ADD USER ---------------------------
  function addUser() {

        return (
          <Formik
            initialValues={{
              email: '',
              lastname: '',
              name: '',
              password: '',
              role: 0
            }}
      
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Imię jest wymagane'),
              lastname: Yup.string().required('Nazwisko jest wymagane'),
              email: Yup.string().email('Email jest niepoprawny').required('Email jest wymagany'),
              password: Yup.string().min(6, 'Minimalna długość hasła to 6 znaków').required('Hasło jest wymagane')
            })}
      
            onSubmit={(values, { setSubmitting }) => {
                
              setTimeout(() => {
                let dataToSubmit = {
                  email: values.email,
                  password: values.password,
                  name: values.name,
                  lastname: values.lastname,
                  role: values.role 
                };
      
                dispatch(registerUser(dataToSubmit)).then(response => {
                  if (response.payload.success) {
                    alert('Dodano nowego użytkownika')
                    window.location.reload();
                  } else {
                    alert(response.payload.err.errmsg)
                  }
                })
                setSubmitting(false);
              }, 500);
            }}
          >
            
            {props => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <div>
                  <h2>Dodaj nowego użytkownika</h2>
                  <Form style={{maxWidth: '450px'}}  {...formItemLayout} onSubmit={handleSubmit} >
      
                    <Form.Item required label="Imię">
                      <Input
                        id="name"
                        placeholder="Imię"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.name && touched.name ? 'text-input error' : 'text-input'
                        }
                      />
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                      )}
                    </Form.Item>
      
                    <Form.Item required label="Nazwisko">
                      <Input
                        id="lastname"
                        placeholder="Nazwisko"
                        type="text"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.lastname && touched.lastname ? 'text-input error' : 'text-input'
                        }
                      />
                      {errors.lastname && touched.lastname && (
                        <div className="input-feedback">{errors.lastname}</div>
                      )}
                    </Form.Item>
      
                    <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                      <Input
                        id="email"
                        placeholder="Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.email && touched.email ? 'text-input error' : 'text-input'
                        }
                      />
                      {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )}
                    </Form.Item>
      
                    <Form.Item required label="Hasło" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                      <Input
                        id="password"
                        placeholder="Hasło"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password ? 'text-input error' : 'text-input'
                        }
                      />
                      {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )}
                    </Form.Item>
      
                    <Form.Item required label="Rola" hasFeedback>
                      <Input
                        id="role"
                        placeholder="Rola użytkownika"
                        type="number"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.role && touched.role ? 'text-input error' : 'text-input'
                        }
                      />
                      {errors.role && touched.role && (
                        <div className="input-feedback">{errors.role}</div>
                      )}
                    </Form.Item>
      
                    <Form.Item {...tailFormItemLayout}>
                      <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                        Dodaj
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              );
            }}
          </Formik>
        );
  };


  //-----------------------------EDIT USER ---------------------------

      
  function editUser(id) {
    return (
      <Formik
    
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
              password: values.password,
              name: values.name,
              lastname: values.lastname,
              role: values.role 
            };
  
            dispatch(updateUser(dataToSubmit, id)).then(response => {
              if (response.payload.success) {
                alert('Edytowano użytkownika')
                window.location.reload();
              } else {
                alert("Edycja Zakończona")
                window.location.reload();
              }
            })
            setSubmitting(false);
          }, 500);
        }}
      >
        
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <div>
              <Form style={{maxWidth: '450px'}}  {...formItemLayout} onSubmit={handleSubmit} >
                <Form.Item label="Imię">
                  <Input
                    id="name"
                    placeholder="Imię"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
  
                <Form.Item label="Nazwisko">
                  <Input
                    id="lastname"
                    placeholder="Nazwisko"
                    type="text"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
  
                <Form.Item label="Email" hasFeedback>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
  
                <Form.Item label="Hasło" hasFeedback>
                  <Input
                    id="password"
                    placeholder="Hasło"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
  
                <Form.Item label="Rola" hasFeedback>
                  <Input
                    id="role"
                    placeholder="Rola użytkownika"
                    type="number"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
  
                <Form.Item {...tailFormItemLayout}>
                  <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                    Zapisz zmiany
                  </Button>
                </Form.Item>
              </Form>
            </div>
          );
        }}
      </Formik>
    );
};



  const addUserFun = addUser();
  const EditUserFun = editUser();
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    Axios.post('/api/users/getUsers')
      .then(response => {
        if (response.data.success) {
          setUsers(response.data.users)
          console.log(response.data.users)
        } else {
          alert('Nie udało się pobrać dane')
        }
      })
  },[])

    
   
    const renderUsers = Users.map((user, index) => {
      const deleteUser = event => {
          event.preventDefault();
            Axios.delete(`/api/users/${user._id}`)
              .then(res => {
                alert(`Usunięto użytkownika ${user.name} ${user.lastname} o id ${user._id}`)
                console.log(res);
                console.log(res.data);
                window.location.reload();
        })
      }

    //   const editUserConst = event => {
    //     event.preventDefault();
    //       Axios.post(`/api/users/editUser/${user._id}`)
    //         .then(res => {
    //           alert(`Edytowano użytkownika o id ${user._id}`)
    //           console.log(res);
    //           console.log(res.data);
    //           window.location.reload();
    //   })
    // }

      return(
            <div>
                <ul style={{listStyle:"none"}}>
                    <li>
                        id: {user._id}
                    </li>
                    <li>
                        Imię: {user.name}
                    </li>
                    <li>
                        Nazwisko: {user.lastname}
                    </li>
                    <li>
                        email: {user.email}
                    </li>
                    <li>
                        hasło: {user.password}
                    </li>
                    <li>
                        Poziom dostępu: {user.role}
                    </li>
                    <li style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                      <Button onClick={deleteUser}>Usuń</Button> 
                      <br />
                      <Collapse style={{textAlign: 'center'}}>
                        <Panel header="Edytuj" > 
                          {editUser(user._id)}
                        </Panel>
                      </Collapse> 
                      <br />
                    </li>
                    <li>
                    
                    </li>
                </ul>
            </div>
        )
       
    })


    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Zarządzanie użytkownikami</h1>
            <br /><br />

            <Collapse>
                <Panel header="Pokaż wszystkich użytkowników" > 
                    {renderUsers}
                </Panel>
            </Collapse>  

            <br /><br />
            <Collapse>
                <Panel header="Dodaj nowego użytkownika" > 
                   {addUserFun}
                </Panel>
            </Collapse>  
          
            
            <br /><br />
        </div>
    );
    
}

export default UsersPanel;