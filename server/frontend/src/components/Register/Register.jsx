import React, { useState } from 'react';

const Register = () => {
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Registering");
    };

    return (
        <div>
            <h1>Sign-up</h1>
            <form onSubmit={handleRegister}>
                <input type="text" name="Username" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                <input type="text" name="First Name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <input type="text" name="Last Name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <input type="email" name="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="Password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
