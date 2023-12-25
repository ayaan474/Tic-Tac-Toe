import { useState } from "react";
import Card  from "../card/card";
import isWinner from  "../helper/checkWinner";
import { ToastContainer, toast } from 'react-toastify';
import './Grid.css'


import 'react-toastify/dist/ReactToastify.css';






   


function Grid({numberOfCards}){
    const [turn, setTurn] = useState(true); //false=> x  true=> 0
    const[board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [winner, setWinner] = useState("");

   
    function play(index){
    
        if(turn == true){

            board[index] = "O";
        }else{
            board[index] ="X";
        }

        const win = isWinner(board, turn ? "O" : "X")

            if(win){
                setWinner(win);
                toast.success(`congratulations ${win} won the game`)

            
        }
        setBoard([...board]);
        setTurn(!turn);
    }
    
    function reset(){

        setBoard((Array(numberOfCards).fill("")));
        setWinner(null);
        setTurn(true);
        }



 return(
 <div className="grid-wrap"> 
     {winner && (
        <>
     
     <h1 className="Turn-Highlight">winner is {winner}</h1>
     <button className="reset" onClick={reset}>restart</button>
     <ToastContainer position="top-center"/>
     
     </>
     )}


    <h1 className="Turn-Highlight">Current Turn: {(turn) ? 'O' :'X'}</h1>
     <div className="Grid">

     {board.map((value,idx)=>{

        return <Card gameEnd={winner ? true : false} onPlay={play} player={value} key={idx} index={idx} />
     }
     )}
     </div>
</div>

 )
}

export default Grid;