import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { Form, Input, Button,} from 'antd';


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

function RegisterPage(props) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        lastname: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}

      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Imię jest wymagane'),
        lastname: Yup.string()
          .required('Nazwisko jest wymagane'),
        email: Yup.string()
          .email('Email jest niepoprawny')
          .required('Email jest wymagany'),
        password: Yup.string()
          .min(6, 'Minimalna długość hasła to 6 znaków')
          .required('Hasło jest wymagane'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Podano różne hasła')
          .required('Wymagane jest potwierdzenie hasła')
      })}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
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
          handleSubmit
        } = props;
        return (
          <div className="app">
            <h2>Rejestracja</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

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

              <Form.Item required label="Potwierdź hasło" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Potwierdź hasło"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Rejestracja
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
