import React from 'react'
import { useState } from 'react'
import { register } from '@/services/auth.service';


const Register = () => {

  const[fullName,setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState("");

  const onSubmit = async(e) => {
    e.preventDefault();
   await register(fullName,email, password, role)
  }

  return (
    <div className='w-full flex justify-center flex-col mx-2'>
      <h2 className='font-bold text-2xl mt-8'> Register Form</h2> <br/>

      <form className='w-[50%]' onSubmit={onSubmit}>
           <div>
            <label htmlFor='fullName'>FullName</label>
            <input type="text" id='fullName' name='fullName' className='w-full border border-black ' value= {fullName}
            onChange={(e)=> setFullName(e.target.value)}
            />
           </div>

           <div>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' className='w-full border border-black ' value={email} onChange={(e) => setEmail(e.target.value)}/>
           </div>

           <div>
            <label htmlFor='password'>password</label>
            <input type="password" id='password' name='password' className='w-full border border-black'
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            />
           </div>

           <div>
            <label htmlFor="role">Role:</label>
            <select name="role" id="role"
             value={role}
             className='w-full border border-black'
             onChange={(e) => setRole(e.target.value)}
            >

              <option value={""}>Select a role</option>
              <option value={"patient"}>Patient</option>
              <option value={"doctor"}>Doctor</option>
            </select>
           </div>

             <button type='submit' className='mt-8 border border-black px-6 py-1 text-center bg-gray-600 text-white cursor-pointer hover:bg-gray-900 transition'>Register</button>
      </form>

    </div>
  )
}

export default Register