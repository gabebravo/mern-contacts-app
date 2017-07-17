const app = require('./server/app');
const {PORT} = require('./config.js');

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
