import server from './server';

import connect from './utils/database/connect';

const app = async () => {
  await connect();
  console.log('==========\nDATABASE CONNECTED\n==========')
  const port = process.env.API_PORT || '5001';
  server.listen(port, () => console.log(`==========\nSERVER LISTENING (PORT: ${port})\n==========`));
};

app();
