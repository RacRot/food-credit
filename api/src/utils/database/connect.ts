import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

const DBname = process.env.DB_NAME || 'foodcredit';
const DBport = process.env.DB_PORT || 27017;


const connect = async () => {
  await mongoose.connect(
    `mongodb://db:${DBport}/${DBname}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  // NOTE: Load models to register them
  const normalizedPath = path.join(__dirname, '../../models');
  fs.readdirSync(normalizedPath)
    .forEach(model => {
      require('../../models/' + model);
    });
};

export default connect;
