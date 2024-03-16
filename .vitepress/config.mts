import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "SEU-Project R",
	description: "东南大学电子科协嵌入式培训",
	base: "SEU_ProjectR/",
	cleanUrls: true,
	srcDir: "docs",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Examples', link: '/markdown-examples' }
		],

		sidebar: [
			{
				text: "在开始之前",
				link: "/before-starting"
			}

		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }
		]
	}
})
