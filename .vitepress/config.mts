import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "SEU-Project R",
	description: "东南大学电子科协嵌入式培训",
	base: "/SEU_ProjectR/",
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
				text: "序: 在世界诞生之前",
				link: "/embedded/0"
			},
			{
				text: "准备工作与相关注意事项",
				link: "/embedded/1"
			},

		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/YeonGu/SEU_ProjectR' }
		]
	}
})
