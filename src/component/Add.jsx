import { useContext, useRef, useState } from "react";
import { AppContext } from "../context/App";
import { Btn } from "./global";
import {} from "./index";
import img from "../asset/img";

export default function Add() {
	const appContext = useContext(AppContext);
	const [isChecked, setIsChecked] = useState(false);
	const refInput = useRef(null);
	
	const fCheck = () => setIsChecked(!isChecked);
	const fRemove = () => refInput.current.value = "";
	
	const fAdd = (e) => {
		e.preventDefault();

		const value = refInput.current.value;
		if (!value) return;

		const newTodo = { id: Math.random(), name: value, done: isChecked };
		appContext.dispatch({ type: "ADD_TODO", payload: newTodo });

		fRemove();
	};


	return (
        <label className="remove px-6 py-4 flex items-center gap-4 bg-slate-900 rounded-md hover:bg-slate-800" htmlFor="add">
			<input className="check" id="add" type="checkbox" checked={isChecked} onChange={fCheck} readOnly />
			<div className="checkSign flex-none"><img src={img.iconCheck} alt="" /></div>

			<form className="flex-grow" onSubmit={fAdd}>
				<input className="w-full h-[1em] p-1 bg-transparent text-gray-100  focus:outline-none" placeholder="Create a new todo..." type="text" ref={refInput} />
			</form>

			<Btn className="removeMain flex-none" icon={img.iconCross} onClick={fRemove}/>
		</label>
	);
}