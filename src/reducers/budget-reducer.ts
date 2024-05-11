import { DraftExpense, Expense } from "../types"
import { v4 as uuidv4} from 'uuid'


export type BudgetActions = 
{ type: 'add-budget', payload: {budget:number}} |
{ type: 'show-modal'} |
{ type: 'hide-modal'} |
{ type: 'load-expenses', payload: {expenses: Expense[]}} |
{ type: 'add-expense', payload: {expense: DraftExpense}} |
{ type: 'started-update-expense', payload: {id: Expense['id']}} |
{ type: 'final-update-expense', payload: {expense: Expense}} |
{ type: 'remove-expense', payload: {id: Expense['id']}} |
{ type: 'add-filter-category', payload: {id: Expense['id']}} |
{ type: 'reset-aplication'} 

export type BudgetState = {
    budget:number,
    modal: boolean,
    expenses: Expense[],
    updateExpense: Expense['id'],
    currentCategory: Expense['id']
}

const initialBudget = ():number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget:0
}

const initialExpenses = ():Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses? JSON.parse(localStorageExpenses): []
}



export const initialState: BudgetState = {
    budget:initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    updateExpense: '',
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
}
export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }
    if (action.type === 'hide-modal') {
        return {
            ...state,
            updateExpense: '',
            modal: false
        }
    }
    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense) 
        
        return {
            ...state,
            expenses: [...state.expenses, expense],
            updateExpense: '',
            modal: false
        }
    }
    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(exp => exp.id !== action.payload.id)
        }
    }
    if (action.type === 'started-update-expense') {
        return {
            ...state,
            modal:true,
            updateExpense: action.payload.id
        }
    }
    if (action.type === 'final-update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(exp => exp.id === action.payload.expense.id ? action.payload.expense: exp),
            modal:false,
            updateExpense: ''
        }
    }
    if(action.type === 'load-expenses') {
        return {
            ...state,
            expenses: action.payload.expenses
        }
    }
    
    if(action.type === 'reset-aplication') {
        return {
            ...state,
            budget: 0, 
            expenses: []
            
        }
    }

    if(action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state 
}