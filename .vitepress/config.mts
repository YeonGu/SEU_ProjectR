import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "SEU-Project R",
	description: "东南大学电子科协嵌入式培训",
	base: "/",
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
				text: "嵌入式培训讲义",
				items: [
					{
						text: "第一章 引言",
						link: "/embedded/1introduction"
					},
					{
						text: "第二章 旅程开始之前: 准备工作与相关注意事项",
						link: "/embedded/2envi"
					},
					{
						text: "第三章 GPIO-梦开始的地方",
						link: "/embedded/3GPIO"
					},
					{
						text: "第四章 信息邮递员-UART及其应用",
						link: "/embedded/4uart"
					},
					{
						text: "第五章 穿越时空的旅程-中断及其应用",
						link: "/embedded/5interupt"
					},
					{
						text: "第六章 时间守护者-定时器及其应用",
						link: "/embedded/6timer"
					},
					{
						text: "第七章 将大局逆转吧！-综合练习",
						link: "/embedded/7finalexe"
					},
				]
			},
			{ text: "导航页: 竞赛资源分享", link: "/matches/index" },
			{ text: "vscode", link: "/old/mdk6" },
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/YeonGu/SEU_ProjectR' }
		]
	}
})
