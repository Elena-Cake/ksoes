import React from "react";
import './Login.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export type valuesType = {
    username: string,
    password: string
};
type PropsType = {
    onSubmit: (values: valuesType) => void;
};
export const LoginForm: React.FC<PropsType> = ({ onSubmit }) => {


    // const validationsSchema = yup.object().shape({
    //     email: yup.string().typeError('String').required('Required'),
    //     password: yup.string().typeError('String').required('Required'),
    //     // confirmPassword: yup.string().typeError('String').oneOf([yup.ref('password')], 'not equal pass').required('Required'),
    // })
    return (
        <div className={'login'}>
            <h1 className={'login__title'}>Войдите</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validateOnBlur
                // validationSchema={validationsSchema}
                onSubmit={(values) => {
                    onSubmit(values);
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (

                    <Form onSubmit={handleSubmit}>
                        <div className={'form__input'}>
                            <label>Логин</label>
                            <Field
                                name='username'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                placeholder="Введите логин"
                                className={'login__formItem'} />
                            <ErrorMessage className={'input__error'} name="username" component="span"></ErrorMessage>
                        </div>
                        <div className={'form__input'}>
                            <label>Пароль</label>
                            <Field
                                name={'password'}
                                type={'password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="Введите пароль"
                                className={'login__formItem'} />
                            <ErrorMessage className={'input__error'} name="password" component="span"></ErrorMessage>
                        </div>
                        <button className={'login__btnOkey'} disabled={!isValid && !dirty} type="submit">Войти</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
