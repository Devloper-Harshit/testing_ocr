import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const onSubmit = data => {
        // console.log(data);
        alert("Registered Successfully");
        // fetch('api/register', {           //TRYING TO ADD PROXY
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(formData => {
            console.log('Success:', data);
          })
          .catch((errors) => {
            console.error('Error:', errors);
          });
          
          
        };
    

    return (
        <div className="Container">
            <div className='heading'>Register</div>
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
                    {/* <input 
          type= {showPassword ? 'text' : 'password'} 
          {...register('password', { required: '* Password is required' })} 
        /> */}
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
                    {/* {errors.password && <p className="errorMsg">{errors.password.message}</p>} */}
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

                <div className="form-control">
                    <label>Confirm Password</label>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword', {
                            required: '* Confirm Password is required',
                            validate: value => value === watch('password') || 'Passwords do not match'
                        })}
                        autocomplete="off" 
                    />
                    <FontAwesomeIcon
                        className='eye'
                        icon={showConfirmPassword ? faEyeSlash : faEye}
                        onClick={toggleShowConfirmPassword}
                    />

                    {errors.confirmPassword && <p className="errorMsg">{errors.confirmPassword.message}</p>}
                </div>

                <div className="form-control">
                    <label>Contact</label>
                    <input
                        type="tel"
                        name="mobile"
                        {...register('mobile', {
                            required: '* Mobile number is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: '* Invalid mobile number',
                            },
                        })}
                        autocomplete="off" 
                    />
                    {errors.mobile && <p className="errorMsg">{errors.mobile.message}</p>}

                </div>

                <button className="submit_btn" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
