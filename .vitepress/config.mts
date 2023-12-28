import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SEU_Project_R",
  description: "东南大学电子科协嵌入式培训",
  base: "https://yeongu.github.io/SEU_ProjectR/",
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
        link: "/SEU-Project R：在开始之前"
      }

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})