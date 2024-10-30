import {useContext} from "react";
import {DashboardContext, DashboardContextType } from "@/components/dashboard/DashboardProvider.tsx";

export const useDashboardContext = (): DashboardContextType => {
	const context = useContext(DashboardContext);
	if (!context) {
		throw new Error("useDashboardContext must be used within a DashboardProvider");
	}
	return context;
};