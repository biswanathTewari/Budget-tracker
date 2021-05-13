import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
	incomeTransactions:
		JSON.parse(localStorage.getItem("incomeTransactions")) || [],
	expenseTransactions:
		JSON.parse(localStorage.getItem("expenseTransactions")) || [],
};

export const GlobalContext = createContext(initialState);

export const GlobalStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	useEffect(() => {
		localStorage.setItem(
			"incomeTransactions",
			JSON.stringify(state.incomeTransactions)
		);
		localStorage.setItem(
			"expenseTransactions",
			JSON.stringify(state.expenseTransactions)
		);
	});

	//^ action creator
	const addIncome = (incomeTransaction) => {
		dispatch({
			//^ action
			type: "ADD_INCOME",
			payload: incomeTransaction,
		});
	};

	//^ action creator
	const addExpense = (expenseTransaction) => {
		dispatch({
			//^ action
			type: "ADD_EXPENSE",
			payload: expenseTransaction,
		});
	};

	//^ action creator
	const deleteTransaction = (id) => {
		dispatch({
			//^ action
			type: "DELETE_TRANSACTION",
			payload: id,
		});
	};

	return (
		<GlobalContext.Provider
			value={{
				incomeTransactions: state.incomeTransactions,
				expenseTransactions: state.expenseTransactions,
				addIncome,
				addExpense,
				deleteTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
