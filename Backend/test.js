const http = require('http');

const data = JSON.stringify({
  name: 'Test Worker',
  email: `test${Date.now()}@example.com`,
  password: 'password123',
  phone: '1234567890',
  role: 'worker'
});

const req = http.request({
  host: '127.0.0.1',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Register Response:', body);
    const result = JSON.parse(body);
    
    // Test login
    const loginData = JSON.stringify({
      email: result.email,
      password: 'password123'
    });
    
    const loginReq = http.request({
      host: '127.0.0.1',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    }, (loginRes) => {
      let loginBody = '';
      loginRes.on('data', chunk => loginBody += chunk);
      loginRes.on('end', () => {
        console.log('Login Response:', loginBody);
      });
    });
    
    loginReq.write(loginData);
    loginReq.end();
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
