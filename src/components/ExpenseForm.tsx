import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import DatePicker from 'react-date-picker';
import { categories } from "../data/categories";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMenssage from "./ErrorMenssage";
import { useBudget } from "../hooks/useBudget";

const initialStateExpenseForm = {
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
}

function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>(initialStateExpenseForm)
    const [error, setError] = useState('')
    const {state, dispatch, remainingBudget} = useBudget()
    // estados para validar el presupuesto 
    const [previewAmount, setPreviewAmount] = useState(0);

    useEffect(() => {
      //validar que este nulo 
      if(state?.updateExpense) {
        const editingExpense = state.expenses.filter(exp => exp.id === state.updateExpense)[0]
        setExpense(editingExpense)
        setPreviewAmount(editingExpense.amount)


      } 
    }, [state?.updateExpense]);

    const handleChangeDate = (value: Value) => {
            setExpense({
                ...expense,
                date:value
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
            const {name, value} = e.target

            const isAmountField = ['amount'].includes(name)
            setExpense({
                ...expense,
                [name]: isAmountField?+value: value
            })

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return 
        }

        // validar que el valor ingresado no supere al valor del presupuesto total
        if((expense.amount-previewAmount) > remainingBudget){
            setError('No puede superar el presupuesto')
            return 
        }


        // agregar o actualizar el gasto
        if (state?.updateExpense) {
            dispatch({type:'final-update-expense', payload:{expense: {...expense, id: state.updateExpense}}})
        } else {
            dispatch({type:'add-expense', payload:{expense}})
        }
        // adherir un nuevo gasto
        // reiniciar el expense
        setExpense(initialStateExpenseForm)
        setPreviewAmount(0)
        // cerrar el modal 
    }
  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
        <legend className='uppercase text-center text-2xl font-black border-b-4
        border-blue-500 py-2'>
            {state?.updateExpense? 'Editar Gasto': 'Nuevo Gasto'}
        </legend>
        {error && <ErrorMenssage>{error}</ErrorMenssage>}
        <div className='flex flex-col gap-2'>
            <label htmlFor='expenseName' className='text-xl'>
                Nombre Gasto
            </label>
            <input type='text' id='expenseName' 
                placeholder='Añade el nombre del gasto'
                className='bg-slate-100 py-2'
                name='expenseName'
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor='amount' className='text-xl'>
                Cantidad
            </label>
            <input type='number' id='amount' 
                placeholder='Añade la cantidad del gasto ejm 300'
                className='bg-slate-100 py-2'
                name='amount'
                value={expense.amount}
                onChange={handleChange}
            />
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor='amount' className='text-xl'>
                Categoria
            </label>
            <select id='category'
                className='bg-slate-100 py-2'
                name='category'
                value={expense.category}
                onChange={handleChange}
            >
                  <option value=''>-- Seleccione --</option>  
                  {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))
                  }
            </select>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor='dateSpent' className='text-xl'>
                Fecha Gasto
            </label>
            <DatePicker id='dateSpent' 
            value={expense.date}
            onChange={handleChangeDate}
            className = 'bg-slate-100 p-2 border-0'/>
        </div>
        <input type='submit' className='bg-blue-600 hover:bg-blue-800 cursor-pointer w-full p-2
        text-white rounded-lg' 
        value={`${state?.updateExpense?'Editar Gasto':'Registrar Gasto'}`} />
    </form>
  );
}

export default ExpenseForm;
