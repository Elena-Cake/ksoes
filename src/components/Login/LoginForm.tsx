import React from "react";
import './Login.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export type valuesType = {
    email: string;
    password: string;
    confirmPassword?: string;
    isRobot: boolean;
    captcha?: string | null;
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
            <h1 className={'login__title'}>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    isRobot: false,
                    captcha: null
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
                            <label>Email</label>
                            <Field
                                name='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="What your email?"
                                className={'login__formItem'} />
                            <ErrorMessage className={'input__error'} name="email" component="span"></ErrorMessage>
                        </div>
                        <div className={'form__input'}>
                            <label>Password</label>
                            <Field
                                name={'password'}
                                type={'password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="What your password?"
                                className={'login__formItem'} />
                            <ErrorMessage className={'input__error'} name="password" component="span"></ErrorMessage>
                        </div>
                        <button className={'login__btnOkey'} disabled={!isValid && !dirty} type="submit">Сome in</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
