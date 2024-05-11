import { createContext, useMemo, useReducer } from 'react'
import {BudgetActions, BudgetState, budgetReducer,initialState} from '../reducers/budget-reducer'

type BudgetContextProps = {
    state : BudgetState  | undefined
    dispatch: React.Dispatch<BudgetActions>
    totalExpenses:number
    remainingBudget:number
}

//export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)
export const BudgetContext = createContext<BudgetContextProps>(null!)

type BudgetProviderProps = {
    children: React.ReactNode
}

export const BudgetProvider = ({children}: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer,initialState)
      // state derivado
    const totalExpenses = useMemo(() => state!.expenses?.reduce((acc, exp)=> acc + exp.amount,0), [state!.expenses]);
    const remainingBudget = state!.budget - totalExpenses
    return (
        <BudgetContext.Provider  value={{
            state, 
            dispatch,
            totalExpenses,
            remainingBudget
       }}>
        {children}
       </BudgetContext.Provider> 
    )
}