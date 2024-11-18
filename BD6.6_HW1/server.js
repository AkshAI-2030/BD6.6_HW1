const { app } = require('./index');

app.listen(PORT, () => {
  console.log('Server started at port' + PORT);
});
