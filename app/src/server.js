// eslint-disable-next-line semi

import app from './app.js';

const port = 3000;
app.listen(port, () => {
  console.info(`listen on port ${port}`);
});
