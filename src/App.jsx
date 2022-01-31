import React, { useContext, useEffect } from "react";
import { AppContext, AppContextProvider } from "./context/App";
import { Home } from "./page";
import "./style/main.css";
import "./style/app.css";

export default function App() {
	const appContext = useContext(AppContext);

	useEffect(() => {
		document.title = "TodoApp - mdmahikaishar.me";
	}, []);

	return (
		<AppContextProvider>
			<div className={appContext?.isDarkTheme ? "dark": ""}>
				<Home />
			</div>			
		</AppContextProvider>
	);
}
