function checkUsername(username: string) {
  if (!username || username === '')
      return 'Username empty or null';

  if (username.length < 4 || username.length > 20)
      return 'Username must be between 4 and 20 characters long';

  const userRX = /^[A-Za-z0-9_-]{4,20}$/;
  if (!userRX.test(username))
      return 'Username format not valid';
  
  //no error detected
  return '';
}

export default checkUsername;
