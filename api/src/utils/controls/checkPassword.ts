function checkPassword(psw: string) {
  if (!psw || psw === '')
      return 'Password empty or null';

  if (psw.length < 8 || psw.length > 72)
      return 'Password must be between 8 and 72 characters long';
  
  const uppercaseRX = /[A-Z]/;
  const lowercaseRX = /[a-z]/;
  const numberRX = /[0-9]/;
  const symbolsRX = /[-\*\+!#$%\^&\(\)\[\]\{\}\\\.\/,<>\?: ]/;

  const allRXs = [uppercaseRX, lowercaseRX, numberRX, symbolsRX];
  for (const rx of allRXs)
      if (!rx.test(psw))
          return 'Passowrd must contain an uppercase, a lowercase, a number and a symbol';
  
  //no error detected
  return '';
}

export default checkPassword;
