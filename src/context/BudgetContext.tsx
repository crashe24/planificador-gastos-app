import { createContext, useReducer } from 'react'
import {BudgetActions, BudgetState, budgetReducer,initialState} from '../reducers/budget-reducer'

type BudgetContextProps = {
    state : BudgetState  | undefined
    dispatch: React.Dispatch<BudgetActions>
}

//export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)
export const BudgetContext = createContext<BudgetContextProps>(null!)

type BudgetProviderProps = {
    children: React.ReactNode
}

export const BudgetProvider = ({children}: BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer,initialState)
    return (
        <BudgetContext.Provider  value={{
            state, 
            dispatch
       }}>
        {children}
       </BudgetContext.Provider> 
    )
}