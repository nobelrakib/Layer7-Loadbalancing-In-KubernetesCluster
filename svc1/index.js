const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());



app.post('/api/hello', (req, res) => {
  const body = req.body;
  res.json(req.body);
});

app.post('/api/svc', async (req, res) => {
    const body = req.body;
    
    try{
        // poridhi-sv2-svc.default.svc.cluster.local
        const response = await axios.post('http://poridhi-sv2-svc.devops.svc.cluster.local/api/hello', body);
        console.log(response.data); 
        res.status(200).json({ success: true, response: response.data });
    }catch (error) {
        console.error('Error sending POST request:', error.message);
        res.status(500).json({ success: false, error: error.message });
      }
    // res.json(req.body);
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
