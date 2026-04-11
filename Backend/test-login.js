async function test() {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'baccha25@gmail.com', password: 'password' })
  });
  const data = await res.json();
  console.log("LOGIN RESPONSE:", data);
}
test();
