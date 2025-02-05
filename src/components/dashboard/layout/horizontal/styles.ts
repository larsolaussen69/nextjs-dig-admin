import type { DashboardNavColor } from "@/types/settings";
import type { ColorScheme } from "@/styles/theme/types";

export const navColorStyles = {
	dark: {
		blend_in: {
			"--MainNav-background": "var(--mui-palette-background-default)",
			"--MainNav-color": "var(--mui-palette-common-white)",
			"--MainNav-border": "1px solid var(--mui-palette-neutral-700)",
			"--MainNav-divider": "var(--mui-palette-neutral-700)",
			"--NavItem-color": "var(--mui-palette-neutral-300)",
			"--NavItem-hover-background": "var(--mui-palette-action-hover)",
			"--NavItem-active-background": "var(--mui-palette-primary-main)",
			"--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
			"--NavItem-icon-color": "var(--mui-palette-neutral-400)",
			"--NavItem-icon-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-icon-disabled-color": "var(--mui-palette-neutral-600)",
			"--NavItem-expand-color": "var(--mui-palette-neutral-400)",
			"--Workspaces-background": "var(--mui-palette-neutral-950)",
			"--Workspaces-border-color": "var(--mui-palette-neutral-700)",
			"--Workspaces-title-color": "var(--mui-palette-neutral-400)",
			"--Workspaces-name-color": "var(--mui-palette-neutral-300)",
			"--Workspaces-expand-color": "var(--mui-palette-neutral-400)",
		},
		discrete: {
			"--MainNav-background": "var(--mui-palette-neutral-900)",
			"--MainNav-color": "var(--mui-palette-common-white)",
			"--MainNav-border": "1px solid var(--mui-palette-neutral-700)",
			"--MainNav-divider": "var(--mui-palette-neutral-700)",
			"--NavItem-color": "var(--mui-palette-neutral-300)",
			"--NavItem-hover-background": "var(--mui-palette-action-hover)",
			"--NavItem-active-background": "var(--mui-palette-primary-main)",
			"--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
			"--NavItem-icon-color": "var(--mui-palette-neutral-400)",
			"--NavItem-icon-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-icon-disabled-color": "var(--mui-palette-neutral-600)",
			"--NavItem-expand-color": "var(--mui-palette-neutral-400)",
			"--Workspaces-background": "var(--mui-palette-neutral-950)",
			"--Workspaces-border-color": "var(--mui-palette-neutral-700)",
			"--Workspaces-title-color": "var(--mui-palette-neutral-400)",
			"--Workspaces-name-color": "var(--mui-palette-neutral-300)",
			"--Workspaces-expand-color": "var(--mui-palette-neutral-400)",
		},
		evident: {
			"--MainNav-background": "var(--mui-palette-neutral-800)",
			"--MainNav-color": "var(--mui-palette-common-white)",
			"--MainNav-border": "none",
			"--MainNav-divider": "var(--mui-palette-neutral-700)",
			"--NavItem-color": "var(--mui-palette-neutral-300)",
			"--NavItem-hover-background": "rgba(255, 255, 255, 0.04)",
			"--NavItem-active-background": "var(--mui-palette-primary-main)",
			"--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
			"--NavItem-icon-color": "var(--mui-palette-neutral-400)",
			"--NavItem-icon-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-icon-disabled-color": "var(--mui-palette-neutral-600)",
			"--NavItem-expand-color": "var(--mui-palette-neutral-400)",
			"--Workspaces-background": "var(--mui-palette-neutral-950)",
			"--Workspaces-border-color": "var(--mui-palette-neutral-700)",
			"--Workspaces-title-color": "var(--mui-palette-neutral-400)",
			"--Workspaces-name-color": "var(--mui-palette-neutral-300)",
			"--Workspaces-expand-color": "var(--mui-palette-neutral-400)",
		},
	},
	light: {
		blend_in: {
			"--MainNav-background": "var(--mui-palette-background-default)",
			"--MainNav-color": "var(--mui-palette-text-primary)",
			"--MainNav-border": "1px solid var(--mui-palette-divider)",
			"--MainNav-divider": "var(--mui-palette-divider)",
			"--NavItem-color": "var(--mui-palette-neutral-600)",
			"--NavItem-hover-background": "var(--mui-palette-action-hover)",
			"--NavItem-active-background": "var(--mui-palette-primary-main)",
			"--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
			"--NavItem-icon-color": "var(--mui-palette-neutral-500)",
			"--NavItem-icon-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-icon-disabled-color": "var(--mui-palette-neutral-500)",
			"--NavItem-expand-color": "var(--mui-palette-neutral-500)",
			"--Workspaces-background": "var(--mui-palette-neutral-100)",
			"--Workspaces-border-color": "var(--mui-palette-divider)",
			"--Workspaces-title-color": "var(--mui-palette-neutra-400)",
			"--Workspaces-name-color": "var(--mui-palette-neutral-900)",
			"--Workspaces-expand-color": "var(--mui-palette-neutral-400)",
		},
		discrete: {
			"--MainNav-background": "var(--mui-palette-neutral-50)",
			"--MainNav-color": "var(--mui-palette-text-primary)",
			"--MainNav-border": "1px solid var(--mui-palette-divider)",
			"--MainNav-divider": "var(--mui-palette-divider)",
			"--NavGroup-title-color": "var(--mui-palette-neutral-600)",
			"--NavItem-color": "var(--mui-palette-neutral-600)",
			"--NavItem-hover-background": "var(--mui-palette-action-hover)",
			"--NavItem-active-background": "var(--mui-palette-primary-main)",
			"--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
			"--NavItem-icon-color": "var(--mui-palette-neutral-500)",
			"--NavItem-icon-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-icon-disabled-color": "var(--mui-palette-neutral-500)",
			"--NavItem-expand-color": "var(--mui-palette-neutral-500)",
			"--Workspaces-background": "var(--mui-palette-neutral-100)",
			"--Workspaces-border-color": "var(--mui-palette-divider)",
			"--Workspaces-title-color": "var(--mui-palette-neutra-400)",
			"--Workspaces-name-color": "var(--mui-palette-neutral-900)",
			"--Workspaces-expand-color": "var(--mui-palette-neutral-400)",
		},
		evident: {
			"--MainNav-background": "var(--mui-palette-neutral-950)",
			"--MainNav-color": "var(--mui-palette-common-white)",
			"--MainNav-border": "none",
			"--MainNav-divider": "var(--mui-palette-neutral-700)",
			"--NavItem-color": "var(--mui-palette-neutral-300)",
			"--NavItem-hover-background": "rgba(255, 255, 255, 0.04)",
			"--NavItem-active-background": "var(--mui-palette-primary-main)",
			"--NavItem-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
			"--NavItem-icon-color": "var(--mui-palette-neutral-400)",
			"--NavItem-icon-active-color": "var(--mui-palette-primary-contrastText)",
			"--NavItem-icon-disabled-color": "var(--mui-palette-neutral-600)",
			"--NavItem-expand-color": "var(--mui-palette-neutral-400)",
			"--Workspaces-background": "var(--mui-palette-neutral-950)",
			"--Workspaces-border-color": "var(--mui-palette-neutral-700)",
			"--Workspaces-title-color": "var(--mui-palette-neutral-400)",
			"--Workspaces-name-color": "var(--mui-palette-neutral-300)",
			"--Workspaces-expand-color": "var(--mui-palette-neutral-400)",
		},
	},
} satisfies Record<ColorScheme, Record<DashboardNavColor, Record<string, string>>>;
