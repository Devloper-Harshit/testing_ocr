
import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { NavLink } from "react-router-dom";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);


    const onSubmit = (data) => {
        console.log(data);

        
        //     <NavLink exact to="/Camera">

        // </NavLink>
    };

    //   console.log(errors);

    return (
        <div className="Container">
            <div className='heading'>Login</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        {...register("email", {
                            required: "* Email is required.",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "* Email is not valid."
                            }
                        })}
                        autocomplete="off" 
                    />
                    {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        {...register("password", {
                            required: true,
                            validate: {
                                checkLength: (value) => value.length >= 6,
                                matchPattern: (value) =>
                                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                                        value
                                    )
                            }
                        })}
                        autocomplete="off" 
                    />
                    <FontAwesomeIcon
                        className='eye'
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={toggleShowPassword}

                    />
                    {errors.password?.type === "required" && (
                        <p className="errorMsg">* Password is required.</p>
                    )}
                    {errors.password?.type === "checkLength" && (
                        <p className="errorMsg">
                            * Password should be at-least 6 characters.
                        </p>
                    )}
                    {errors.password?.type === "matchPattern" && (
                        <p className="errorMsg">
                            * Password should contain at least one uppercase letter, lowercase
                            letter, digit, and special symbol.
                        </p>
                    )}
                </div>

                {/* <NavLink exact to="/Camera"> */}

                    <button className="submit_btn" type="submit">Login</button>
                {/* </NavLink> */}

            </form>
        </div>
    );
}


export default LoginForm;