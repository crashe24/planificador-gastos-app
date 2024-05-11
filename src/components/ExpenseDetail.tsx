import { useMemo } from "react";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'

import 'react-swipeable-list/dist/styles.css'
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
    expense: Expense
}
function ExpenseDetail({expense}: ExpenseDetailProps) {
    const cateforyInfo = useMemo(() => categories.filter(cat => cat.id  === expense.category)[0], [expense]);
    
    const {dispatch, state} = useBudget()

    const updatedExpense = () => {
        const selectedExpense  = state?.expenses.filter( exp => exp.id === expense.id)
        dispatch({type:'started-update-expense', payload:{id:selectedExpense![0].id}})
    }

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={updatedExpense}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={()=>dispatch({type:'remove-expense',payload:{id:expense.id}})} destructive>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )
    
  return (
    <SwipeableList>
        <SwipeableListItem
            maxSwipe={30}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className='bg-white shadow-lg p-10 w-full border-b
                    border-gray-200 flex gap-5 items-center'>
                <div >
                    
                        <img src={`icono_${cateforyInfo.icon}.svg`} alt='icono' className='w-20' />
                </div>
                <div className='flex-1 space-y-2'>
                    <p className='text-sm font-bold uppercase text-slate-600'>{cateforyInfo.name}</p>
                    <p>{expense.expenseName}</p>
                    <p className='to-slate-600 text-sm'>{formatDate(expense.date!.toString())}</p>
                </div>
                <AmountDisplay label="" amount={expense.amount} />
            </div>
        </SwipeableListItem>
    </SwipeableList>
  );
}

export default ExpenseDetail;
