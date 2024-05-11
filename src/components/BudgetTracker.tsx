import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
function BudgetTracker() {

  const { state, dispatch,
    totalExpenses,
    remainingBudget
   } = useBudget()

  const percentageExpense = (totalExpenses/state!.budget*100).toFixed(2)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
       <CircularProgressbar
       text={`${percentageExpense}% gastado`}
       value={+percentageExpense} styles={buildStyles({
        pathColor: percentageExpense === '100'?'#dc2626': '#3b82f6',
        trailColor: '#f5f5f5',
        textSize:8,
        textColor: percentageExpense === '100'?'#dc2626': '#3b82f6'
       })}/>
      </div>
      <div className='flex flex-col justify-center items-center gap-8'>
        <button type='button' className='bg-pink-600 hover:bg-pink-800 w-full p-2 text-white
        uppercase font-bold rounded-lg cursor-pointer'
        onClick={()=> dispatch({type:'reset-aplication'})}>
            Reset App
        </button>
        <AmountDisplay 
            label={'Presupuesto'}
            amount={state!.budget}
        />
        <AmountDisplay 
            label={'Disponible'}
            amount={remainingBudget}
        />
        <AmountDisplay 
            label={'Gastado'}
            amount={totalExpenses}
        />
      </div>
    </div>
  );
}

export default BudgetTracker;
