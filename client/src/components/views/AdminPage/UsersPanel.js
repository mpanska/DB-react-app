import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row, Button, Form, Input, Collapse, Typography } from 'antd';
import { registerUser, updateUser } from "../../../_actions/user_actions";
import * as Yup from 'yup';
import SearchFeature from '../LandingPage/Sections/SearchFeature';
import { Formik } from 'formik';
import { useDispatch } from "react-redux";

const { Meta } = Card;
const { Panel } = Collapse


function UsersPanel() {
    const dispatch = useDispatch();

    const [Users, setUsers] = useState([])
    const [SearchTerms, setSearchTerms] = useState("")
 
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
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <div>
              <Form style={{maxWidth: '450px'}} onSubmit={handleSubmit} >
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
  
                <Form.Item >
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
                  <Form style={{maxWidth: '500px'}}  onSubmit={handleSubmit} >
      
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
      
                    <Form.Item>
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


    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = (variables) => {
        Axios.post('/api/users/getUsers', variables)
            .then(response => {
                if (response.data.success) {
                  setUsers(response.data.users)
                } else {
                  alert('Nie udało się pobrać dane')
                }
            })
    }


    const renderCards = Users.map((users, index) => {
       const deleteUser = event => {
          event.preventDefault();
            Axios.delete(`/api/users/${users._id}`)
              .then(res => {
                alert(`Usunięto użytkownika ${users.name} ${users.lastname} o id ${users._id}`)
                console.log(res);
                console.log(res.data);
                window.location.reload();
        })
      }

        return <Col lg={12} md={8} xs={24}>
            <Card
                hoverable={true}
            >
                <Meta
                    title={users._id}
                />
                <br /><br />
                <p>Imię : {users.name}</p>
                <p>Nazwisko : {users.lastname}</p>
                <p>Email : {users.email}</p>
                <p>Hasło : {users.password}</p>
                <p>Poziom dostępu : {users.role}</p>
                <Button onClick={deleteUser}>Usuń</Button>
                <br /><br />
                <Collapse style={{textAlign: 'center'}}>
                  <Panel header="Edytuj" > 
                    {editUser(users._id)}
                  </Panel>
                </Collapse> 
            </Card>
        </Col>
    })


    const updateSearchTerms = (newSearchTerm) => {
      const variables = {
        searchTerm: newSearchTerm
      }
      setSearchTerms(newSearchTerm)
      getUsers(variables)
    }


    return (
      <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h1> Zarządzanie użytkownikami </h1>
        </div>
        <Collapse >
          <Panel header="Dodaj nowego użytkownika" > 
            {addUserFun}
          </Panel>
        </Collapse> 

        <div style={{ margin: '1rem auto', width: '500px', height: '50px'}}>
          <SearchFeature  refreshFunction={updateSearchTerms} />
        </div>

        {Users.length === 0 ?
          <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Nie znaleziono żadnych użytkowników</h2>
          </div> :
          <div>
            <Row gutter={[16, 16]}>
              {renderCards}
            </Row>
          </div>
        }
      </div>
    )
}

export default UsersPanel
