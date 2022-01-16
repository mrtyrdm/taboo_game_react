
import { useState, useEffect } from 'react';
import data from './words.json';


function App() {
  const [arrCount, setArr] = useState(0);
  const [play,setPlay] = useState(false);
  const [word, setWord] = useState('');
  const number = useState();
  const [point, setPoint] = useState(0);
  const [danger, setDanger] = useState([]);
  const [time, setTime] = useState(20);

  const [seqPlayer, setPlayer] = useState(true);
  const [Apoint, setApoint] = useState(0);
  const [Bpoint, setBpoint] = useState(0);
  const [cssCLass, setClass] = useState('border-indigo-600 text-indigo-600');
  const getData=()=>{
      setArr(arrCount+1);
      console.log(arrCount);
      const keys = Object.keys(data);
      const value = Object.values(data);

      var numArr = [];
      for (let i = 0; i < 50; i++) {
        let a = true,
            n;
        while(a) {
          n = Math.floor(Math.random() * value.length) << 0;
          a = numArr.includes(n);
        }
        numArr.push(n);
      }
      let rrandomNumber = value.length * Math.random() << 0

      const valuesJson =  value[rrandomNumber]; 
      const keyJson =  keys[rrandomNumber];

      setWord(keyJson);
      setDanger(valuesJson);
  }

  const correctPoint = async () => {
    await setPoint(point+1);
    await getData(); 
    await PlayerSettings(point+1);
  }

  const wrongPoint = async () => {
    await setPoint(point-1);
    await getData(); 
    await PlayerSettings(point-1);
  }


  const skipPoint = async () => {
    await setPoint(point);
    await getData(); 
    await PlayerSettings(point);
  }

  const  PlayerSettings = (pointAdd) => {
    if(seqPlayer == 'B'){
      setApoint(pointAdd);
     }
     if(seqPlayer == false){
       setBpoint(pointAdd);
     }
  }

  const playGame = async () => {
   await setPlay(true);
    await getData();
    await setClass('border-indigo-600 text-indigo-600');
    if(seqPlayer===true) {
      setPlayer('B')
    }

    if(seqPlayer==='B') {
      setPlayer(false)
    }
   
  }

  if(play){
    setTimeout(() => {
      if(time>0){
        setTime(time - 1);
      }
    }, 1000);
  }

  const resetGame = () => {
    setPlayer(true);
    setApoint(0);
    setBpoint(0);
    setClass('border-indigo-600 text-indigo-600');
  }

  const classTime = (time) => {
    if(time<10){
      setClass('border-amber-500 text-amber-500');
    }

    if(time<5){
      setClass('border-red-500 text-red-500');
    }
  }

  useEffect(() => {
    getData(number);
  }, []);

  useEffect(() => {
    if(time===0){
      setPlay(false);
      setTime(20);
      setPoint(0);
    }

    classTime(time);
  }, [time]);


  
  const playList = () => {
    if(seqPlayer && !play){
      return (
        
        <div className='flex justify-center h-screen	 items-center relative flex-col'>
             <h1 className='text-center text-6xl my-8 font-extrabold	pink-text'>Taboo Oyunu</h1>
            <div>
                <button className='text-3xl blue py-2 px-4 text-white rounded-lg' onClick={playGame}>{(seqPlayer==='B')? '2. Oyuncu Başla' : 'Oyunu Başla'}</button>
            </div>
          </div>
     
      );
    }
    
    if(!seqPlayer && !play){
      return (
        <div className='flex justify-center h-screen	 items-center relative flex-col'>
           <h4 className='text-center text-4xl  font-extrabold	blue-text'> A : {Apoint} - B : {Bpoint}</h4>
          <h1 className='text-center text-6xl my-8 font-extrabold	pink-text'>Oyun Bitti</h1>
          {Apoint>Bpoint && (<h4 className='text-center text-4xl mb-8 font-extrabold	blue-text'>A takımı kazandı</h4>)}         
          {Apoint<Bpoint && (<> <h4 className='text-center text-4xl mb-8 font-extrabold	blue-text'>B takımı kazandı</h4></>)}         
          {Apoint==Bpoint && (<> <h4 className='text-center text-7xl mb-8  font-extrabold	blue-text'>Berabere Kaldınız</h4></>)} 
          <button className='text-3xl blue py-2 px-4 text-white rounded-lg' onClick={resetGame}>Play Again</button>

        </div>
      );
    }
  }
 
  return (
   <div className='w-full bg-red-100 	h-screen	'>
     {play===true && (

     
          <div className='flex justify-center h-screen flex-col	 items-center relative'>
          <div className='absolute left-4 top-4'>
              <div className='flex items-center'>
                <div className={`w-20 h-20 flex justify-center  items-center border-8 font-extrabold text-xl ${cssCLass} rounded-full`}>
                  {time}
                </div>
                <span className={`px-4 text-2xl font-black ${cssCLass}`}>{(seqPlayer==='B')? 'A Oyuncu' : 'B Oyuncu'}</span>
              </div>
          </div>
            
         <div className="flex item-center w-full flex-wrap">
            <div className='w-full md:w-1/4	flex justify-center items-center'>
              <button className='bg-green-600 rounded-lg  text-white h-32 w-32 md:h-48 md:w-48 text-4xl rounded-full ' onClick={correctPoint}>Doğru</button>
            </div>
            <div className='w-full md:w-2/4'>
            <div className='w-full	 text-center flex-wrap justify-center flex'>
                <div className="blue w-1/2 rounded-lg shadow-lg">
                
                    <h1 className='text-4xl font-bold pink border-b-4 border-white p-4 text-white rounded-t-lg'>{word}</h1>
                    <div className='flex justify-center flex-col py-2'>
                      {danger.map((res, index)=> (
                        <p className='p-2 text-white text-xl uppercase' key={index}>{res}</p>
                      ))}
                    </div>
                </div>
             </div>
            </div>
            <div className='w-full md:w-1/4	flex justify-center items-center'>
            <button className='bg-yellow-600 rounded-lg  text-white h-32 w-32 md:h-48 md:w-48 text-4xl rounded-full ' onClick={skipPoint}>Pas</button>

            </div>
         </div>

             <div className='w-full flex justify-center mt-16'>
             <button className='bg-indigo-800 rounded  text-white p-4 text-4xl rounded-full ' onClick={wrongPoint}>Taboo</button>

             </div>
          </div>
          
  

     )}



    {playList()}
   </div>
  );
}


export default App;