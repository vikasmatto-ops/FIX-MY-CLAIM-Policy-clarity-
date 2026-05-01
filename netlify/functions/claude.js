exports.handler = async (event) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'pdfs-2024-09-25',
    },
    body: event.body,
  });
  const data = await response.json();
  return {
    statusCode: response.status,
    headers: { 
      'Access-Control-Allow-Origin': '*', 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(data),
  };
};
