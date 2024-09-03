const app = require('./app');  // Assuming you have an app.js file with Express setup

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
