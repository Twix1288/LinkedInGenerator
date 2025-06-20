import fetch from 'node-fetch'

async function testCheckLimit() {
  const url = 'https://linked-in-generator-red.vercel.app/api/check-limit'

  const clientId = '44d0bb33-c471-46c4-ade1-be6cfd563f92' // Example clientId; replace if needed

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId }),
    })

    const text = await response.text()

    console.log('HTTP Status:', response.status)
    console.log('Raw response body:', text)

    if (response.ok) {
      const data = JSON.parse(text)
      console.log('Parsed JSON:', data)
    }
  } catch (error) {
    console.error('Error fetching /api/check-limit:', error)
  }
}

testCheckLimit()
