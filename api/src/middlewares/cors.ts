import cors from 'cors';

// TODO: move in configuration
const whitelist = [
  'http://localhost:5000',
];

export default cors({
  origin: whitelist,
});
