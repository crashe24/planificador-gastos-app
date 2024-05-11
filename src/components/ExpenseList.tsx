import { useMemo } from 'react';
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

function ExpenseList() {
    const {state} = useBudget()
    
    const filterExpenses = state?.currentCategory ? state.expenses.filter(exp => exp.category === state.currentCategory): state?.expenses
    const isEmpty = useMemo(() => filterExpenses?.length === 0, [filterExpenses]);
  return (
    <div className='bg-white shadow-lg rounded-lg p-10 mt-10
    '>
      {isEmpty ? ( <p className='to-gray-600 text-2xl font-bold'>No hay Gastos</p>)
               : ( <>
                    <p className='to-gray-600 text-2xl font-bold my-5'>Listado de Gastos</p>
                    {filterExpenses?.map(exp => (
                        <ExpenseDetail
                            key={exp.id}
                            expense={exp}
                        />
                    ))}   
                 </>)}
    </div>
  );
}

export default ExpenseList;

