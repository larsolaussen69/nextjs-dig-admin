import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";

// NOTE: We did not use React Components for Icons, because
//  you may one to get the config from the server.

// NOTE: First level elements are groups.

export interface DashboardConfig {
	// Overriden by Settings Context.
	layout: "horizontal" | "vertical";
	// Overriden by Settings Context.
	navColor: "blend_in" | "discrete" | "evident";
	navItems: NavItemConfig[];
}

export const dashboardConfig = {
	layout: "vertical",
	navColor: "evident",
	navItems: [
		{
			key: "dashboards",
			title: "Dashboards",
			items: [{ key: "users", title: "Brukere", href: paths.dashboard.users, icon: "person" },
				{ key: "programs", title: "Programmer", href: paths.dashboard.programs, icon: "person" },
			],
		}
	],
} satisfies DashboardConfig;
