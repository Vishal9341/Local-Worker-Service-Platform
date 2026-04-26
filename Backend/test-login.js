

async function test() {
  const res = await fetch('https://local-worker-service-platform.onrender.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'manju12@gmail.com', password: 'wrongpassword' })
  });
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Body:', text.substring(0, 200));
}

test();
