import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash, FaLock } from "react-icons/fa";
import { IoPerson, IoMail } from "react-icons/io5";
import { BsFillShieldLockFill } from "react-icons/bs";

const URL = process.env.SERVER_URL || "http://localhost:3000";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const name_ref = useRef<HTMLInputElement>(null);
  const email_ref = useRef<HTMLInputElement>(null);
  const create_ref = useRef<HTMLInputElement>(null);
  const confirm_ref = useRef<HTMLInputElement>(null);
  const navigate=useNavigate();

  function validateUser() {
    let flag = false
    if (name_ref.current?.value && name_ref.current.value.length < 3) {
      alert("Name is too small. At least 4 characters required.");
    } else if (email_ref.current?.value && email_ref.current.value.length < 5) {
      alert("Email should have more than 5 characters");
    } else if (create_ref.current?.value && create_ref.current.value.length < 8) {
      alert("Password should be at least 8 characters long");
    } else if (create_ref.current?.value !== confirm_ref.current?.value) {
      alert("Confirmed password should be same as created password");
    } else {
      flag = true;
    }
    return flag;
  }
  function clearForm() {
    if(name_ref.current){
      name_ref.current.value = '';
    }
    if(email_ref.current){
      email_ref.current.value = '';
    }
    if(create_ref.current){
      create_ref.current.value = '';
    }
    if(confirm_ref.current){
      confirm_ref.current.value = '';
    }
  }
  async function submitHandler(event:React.FormEvent) {
    event.preventDefault();

    if (!validateUser()) {
      return;
    };

    let inputData = { "full_name": name_ref.current?.value, "email": email_ref.current?.value, "password": create_ref.current?.value , tasks:[]};
    const response = await fetch(URL + "/users/register", {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    
    const userRegistered = await response.json();
    if (userRegistered.status === "Success") {
      alert(`User created with email ${userRegistered.data.email}`);
      clearForm();
      navigate('/login');
    } else {
      alert(`User registration failed. ${userRegistered.message}`);
    }
  }


  return (
    <form className="flex flex-col items-center w-screen h-screen relative overflow-hidden justify-center gap-4 bg-green-300 md:w-full md:h-full md:rounded-2xl text-green-600 
    *:w-2/3 *:grid [&_p]:text-[18px] [&_p]:flex [&_p]:items-center [&_p]:gap-3 [&_p]:ml-2
    [&_input]:bg-green-600 [&_input]:not-last:w-full [&_input]:text-white [&_input]:border-2 [&_input]:border-green-600 [&_input]:outline-none [&_input]:rounded-full [&_input]:focus:bg-green-100  [&_input]:focus:text-green-500 [&_input]:h-10 [&_input]:p-2"
      onKeyDown={(e) => { e.key === "Enter" && submitHandler(e) }} onSubmit={(e) => submitHandler(e)}>
      <h1 className="min-w-full text-center absolute top-7 h-auto text-4xl font-bold">Register</h1>
      <label htmlFor="full-name">
        <p><IoPerson />Full Name:</p>
        <input type="text" id="full-name" placeholder="Enter your full name.." ref={name_ref} autoComplete="off" />
      </label>
      <label htmlFor="e-mail">
        <p><IoMail />E-Mail:</p>
        <input type="email" id="e-mail" placeholder="Enter your e-mail.." ref={email_ref} autoComplete="off" />
      </label>
      <label htmlFor="create-pass" className="relative">
        <p><FaLock />Create Password :</p>
        <input type={showPassword ? "text" : "password"} id="create-pass" placeholder="Create your password.." ref={create_ref} />
        <div className="absolute right-2 top-9">
          {showPassword ? <FaRegEye onClick={() => setShowPassword(!showPassword)} /> : <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />}
        </div>
      </label>
      <label htmlFor="confirm-pass">
        <p><BsFillShieldLockFill />Confirm Password :</p>
        <input type="password" id="confirm-pass" placeholder="Confirm your password.." ref={confirm_ref} />
      </label>
      <label htmlFor="submit">
        <input className="w-1/3 m-auto" type="submit" id="submit" />
      </label>
      <p>Already registered ?<Link className="underline hover:text-green-800" to={'/login'}>Login</Link></p>
    </form>
  )
}

export default Form;
