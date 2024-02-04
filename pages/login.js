import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('https://dummyjson.com/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: email, // Assuming the email is used as the username
//           password: password,
//         }),
//       });

//       const data = await response.json();
//       console.log("data",data);
//       if (response.ok) {
//         // If login is successful, set the email in the state
//         setEmail(data.email);
//       } else {
//         console.error('Login failed:', data.message);
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <div>
//         <label>Email:</label>
//         <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </div>
//       <button onClick={handleLogin}>Login</button>
//       {email && <p>Email: {email}</p>}
//     </div>
//   );
// };

// export default LoginPage;


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestBody = {
      username,
      password,
      
    };
  
    console.log('Request Payload:', requestBody);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({
        //   username,
        //   password,
        // }),
        body: JSON.stringify(requestBody),
      });

      console.log("response", response);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error during login:', error);
    }
    router.push("/products")
  };

  return (
  
    <div style={{textAlign:'center', maxWidth: '400px', margin:'auto'}}>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column' }}>
        <label style={{margin:'10px 0'}}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label style={{ margin: '10px 0'}}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" style={{padding:'10px', backgroundColor:'#4CAF50', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}}>Login</button>
      </form>
    </div>
  );
};

export default Login;
