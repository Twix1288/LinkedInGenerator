import fetch from 'node-fetch'

async function testCheckLimit() {
  const url = 'https://your-deployed-site.vercel.app/api/check-limit'  // <-- replace with your actual deployed URL

  const clientId = '44d0bb33-c471-46c4-ade1-be6cfd563f92'  // <-- replace with a test clientId or real one

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId })
    })

    const text = await response.text()

    console.log('Status:', response.status)
    console.log('Response body:', text)

    // Try parsing JSON if status OK
    if (response.ok) {
      const data = JSON.parse(text)
      console.log('Parsed JSON:', data)
    }
  } catch (err) {
    console.error('Error calling /api/check-limit:', err)
  }
}

testCheckLimit()
