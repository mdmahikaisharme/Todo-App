import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/App";
import { Btn } from "./global";
import {} from "./index";
import img from "../asset/img";

export default function List() {
	const appContext = useContext(AppContext);
	const [data, setData] = useState(appContext.todos);
	
	const fCheck = (id) => () => (
		appContext.dispatch({ type: "TOGGLE_TODO_DONE", payload: id })
	);
	const fRemove = (id) => () => (
		appContext.dispatch({ type: "REMOVE_TODO", payload: id })
	);

	// for data
	useEffect(() => {
		switch (appContext.currentTab) {
			case "active": {
				const filteredData = appContext.todos.filter(item => !item.done);

				return setData(() => filteredData);
			}
			case "completed": {
				const filteredData = appContext.todos.filter(item => item.done);
	
				return setData(() => filteredData);
			}
			default: {
				return setData(() => appContext.todos);
			}
		}
	}, [appContext])

	return (
        <div className="bg-slate-900 rounded-md transition duration-200 overflow-hidden md:rounded-none">
			{data.map(item =>
				<Item data={item} fCheck={fCheck} fRemove={fRemove} key={item.id}/>
			)}
		</div>
	);
}

function Item({ data, fCheck, fRemove }) {
	return (
		<label className="item remove px-6 py-4 flex items-center gap-4 border-b-2 border-gray-800 last:border-transparent md:last:border-gray-800 hover:bg-slate-800" htmlFor={data.id}>
			<input className="check" id={data.id} type="checkbox" checked={data.done} onChange={fCheck(data.id)} readOnly />
			<div className="checkSign flex-none"><img src={img.iconCheck} alt="" /></div>

			<p className="checkP flex-grow text-gray-100">{data.name}</p>
			<Btn className="removeMain flex-none" icon={img.iconCross} onClick={fRemove(data.id)}/>
		</label>
	);
}