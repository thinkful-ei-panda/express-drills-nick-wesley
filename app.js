const express = require('express');
const morgan= require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/lotto', (req,res)=>{
  let lottoNumbers=req.query.arr.map(number=>Number(number));
  let duplicateCheck=[];
  let invalidNumber;
  duplicateCheck=lottoNumbers.filter((number,index) =>{
    if((number)>20||(number)<1||parseInt(number)!==(number)){
      invalidNumber=true;
    }
    return lottoNumbers.indexOf(number)!==index;
  });
  if(duplicateCheck.length!==0){
    res.status(400).send('Numbers can\'t be duplicates');
  }
  if(lottoNumbers.length!==6){
    res.status(400).send('Enter 6 numbers');
  }
  if(invalidNumber){
    res.status(400).send('Please enter integers between 1 and 20');
  }
  const getNumber = () => {
    return Math.ceil(Math.random() * 20);
  };

  let winningNumbers=[];
  for(let i=0;i<6;i++){
    let randomNumber;
    do{
      randomNumber=getNumber();
    }while(winningNumbers.includes(randomNumber));
    winningNumbers.push(randomNumber);
  }

  const matchingLottoNumbers= [...lottoNumbers,...winningNumbers].filter((number,index)=>{
    return [...lottoNumbers,...winningNumbers].indexOf(number)!==index;
  });

  switch(matchingLottoNumbers.length){
  case 4:
    res.send('Congratulations, you win a free ticket');
    break;
  case 5:
    res.send('Congratulations! You win $100!');
    break;
  case 6:
    res.send('Wow! Unbelievable! You could have won the mega millions!');
    break;
  default:
    res.send(`Sorry, you lose ${matchingLottoNumbers}`);
  }
});
 
app.listen(8000, ()=>{
  console.log('this server is listening');
});