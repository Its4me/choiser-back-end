const app = require('./app')
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

//Run app, then load http://localhost:3000 in a browser to see the output.