import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/App";
import { Btn } from "./global";
import {} from "./index";

export default function Status() {
	const appContext = useContext(AppContext);
	const [itemsLeft, setItemsLeft] = useState(0);
	const data = [
		{ id: "all", name: "All" },
		{ id: "active", name: "Active" },
		{ id: "completed", name: "Completed" },
	];

	const fToggleTab = (tabName) => () => (
		appContext.dispatch({ type: "TOGGLE_TAB", payload: tabName })
	);
	const fClearCompletedTodos = () => (
		appContext.dispatch({ type: "CLEAR_COMPLETED_TODO" })
	);

	// for itemsLeft
	useEffect(() => {
		setItemsLeft(() => 
			appContext.todos.filter(item => !item.done).length
		);
	}, [appContext])

	return (
		<div className="mt-4 md:mt-0 px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-2 bg-slate-900 rounded-md md:rounded-none md:">
			<StatusItem txt={`${itemsLeft || "None"} item${itemsLeft === 1 ? "" : "s"} left`} />

			<div className="flex items-center gap-4">
				{data.map((item) => (
					<TabItem
						data={item}
						currentTab={appContext.currentTab}
						fToggleTab={fToggleTab}
						key={item.id}
					/>
				))}
			</div>

			<StatusItem txt={`Clear Completed`} onClick={fClearCompletedTodos} />
		</div>
	);
}

function StatusItem({ txt, ...prop }) {
	return <Btn className="text-xs font-semibold text-gray-600 transition-colors duration-200 cursor-pointer hover:text-gray-100" txt={txt} {...prop} />
}

function TabItem({ data, currentTab, fToggleTab }) {
	return (
		<>
			<input className="tabItem hidden" id={data.id} checked={currentTab === data.id} type="radio" name="tabItem" onChange={fToggleTab(data.id)} readOnly />
			<label className="tabItemLabel text-sm font-bold text-gray-600 transition-colors duration-200 cursor-pointer hover:text-gray-100" htmlFor={data.id}>{data.name}</label>
		</>
	);
}