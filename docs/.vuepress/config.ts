/**
 * 提示：如您想使用JS版本的配置文件可参考：https://github.com/xugaoyi/vuepress-theme-vdoing/tree/a2f03e993dd2f2a3afdc57cf72adfc6f1b6b0c32/docs/.vuepress
 */
import { resolve } from 'path'
import { defineConfig4CustomTheme, UserPlugins } from 'vuepress/config'
import { VdoingThemeConfig } from 'vuepress-theme-vdoing/types'
import dayjs from 'dayjs'
import baiduCode from './config/baiduCode' // 百度统计hm码
import htmlModules from './config/htmlModules' // 自定义插入的html块
import { readFileList, readTotalFileWords, readEachFileWords } from './webSiteInfo/readFile' // 站点信息模块

const DOMAIN_NAME = 'ccus.cf' // 域名 (不带https)
const WEB_SITE = `https://${DOMAIN_NAME}` // 网址

export default defineConfig4CustomTheme<VdoingThemeConfig>({
  theme: 'vdoing', // 使用npm主题包
  // theme: resolve(__dirname, '../../vdoing'), // 使用本地主题包

  locales: {
    '/': {
      lang: 'zh-CN',
      title: "ƝⱲƲzʍҽժ's աօɾƖժ",
      description: '提供DAC学术导航、趣味知识、网络技术、建站分享、CCUS、CO2捕集和各种网盘资源。',
    }
  },
  base: '/', 
  // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）

  // 主题配置
  themeConfig: {
    // 导航配置
    nav: [
      { text: '首页', link: '/' },
      { text: 'DAC导航', link: '/dacdh0/' },
      {
        text: 'CO₂',
        link: '/CO2/', //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
        items: [
          // 说明：以下所有link的值只是在相应md文件头部定义的永久链接（不是什么特殊编码）。另外，注意结尾是有斜杠的
          {
            text: '碳索',
            items: [
              { text: '碳源-探本溯源', link: '/ty/00/' },
              { text: '碳路-负碳之路', link: '/tl/00/' },
              { text: '碳望-三零六零', link: '/tw/05/' },
            ],
          },
          {
            text: 'DAC',
            items: [
              { text: '技术概览', link: '/dac/5/' },
              { text: '基础研究', link: '/dac/10/' },
              { text: '工程案例', link: '/dac/20/' },
            ],
          },
          {
            text: '风轻扬',
            items: [
              { text: '风', link: '/fqy/01/' },
              { text: '氢', link: '/fqy/20/' },
              { text: '阳', link: '/fqy/30/' },
            ],
          },
        ],
      },
      {
        text: '奇趣',
        link: '/interest/',
        items: [
          { text: '基础科学', link: '/sci/10/' },
          { text: '网络技术', link: '/net/00/' },
          { text: '趣味知识', link: '/interest/01/' },
        ],
      },
      {
        text: '技术',
        link: '/technology/',
        items: [
          { text: '技术文档', link: '/tech/01/' },
          { text: '软件教程', link: '/software/01/' },
        ],
      },
      {
        text: '资源',
        link: '/resource/',
        items: [
          { text: '教育考试', link: '/exam/01/' },
          { text: '文理知识', link: '/knowledge/01/' },
          { text: '兴趣技能', link: '/skill/01/' },
          { text: '影音娱乐', link: '/movie/01/' },
          { text: '其他资源', link: '/others/01/' },
        ],
      }, 
      {
        text: '更多',
        link: '/more/',
        items: [
          { text: '学习', link: '/study/00/' },
          { text: '工作', link: '/job/01/' },
        ],
      },
      {
        text: '索引',
        link: '/archives/',
        items: [
          { text: '分类', link: '/categories/' },
          { text: '标签', link: '/tags/' },
          { text: '归档', link: '/archives/' },
        ],
      },
      { 
        text: '关于', 
        link: '/me/', 
        items: [
          { text: '我', link: '/me/' },
          { text: '友链', link: '/friends/' },
        ],      
      },
    ],
    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: 'https://s1.ax1x.com/2023/01/06/pSA5HcF.jpg', // 导航栏logo
    repo: 'nwuzmedoutlook/newdac', // 导航栏右侧生成Github链接
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
    docsDir: 'docs', // 编辑的文件夹
    docsBranch: 'main', // 编辑的文件所在分支，默认master。 注意：如果你的分支是main则修改为main
    editLinks: true, // 启用编辑
    editLinkText: '编辑此页',

    // 站点配置（首页 & 文章页）
    blogInfo: {
      blogCreate: '2021-02-08', // 博客创建时间
      indexView: true,  // 开启首页的访问量和排名统计，默认 true（开启）
      pageView: true,  // 开启文章页的浏览量统计，默认 true（开启）
      readingTime: true,  // 开启文章页的预计阅读时间，条件：开启 eachFileWords，默认 true（开启）。可在 eachFileWords 的 readEachFileWords 的第二个和第三个参数自定义，默认 1 分钟 300 中文、160 英文
      eachFileWords: readEachFileWords([''], 300, 160),  // 开启每个文章页的字数。readEachFileWords(['xx']) 关闭 xx 目录（可多个，可不传参数）下的文章页字数和阅读时长，后面两个参数分别是 1 分钟里能阅读的中文字数和英文字数。无默认值。readEachFileWords() 方法默认排除了 article 为 false 的文章
      mdFileCountType: 'archives',  // 开启文档数。1. archives 获取归档的文档数（默认）。2. 数组 readFileList(['xx']) 排除 xx 目录（可多个，可不传参数），获取其他目录的文档数。提示：readFileList() 获取 docs 下所有的 md 文档（除了 `.vuepress` 和 `@pages` 目录下的文档）
      totalWords: 'archives',  // 开启本站文档总字数。1. archives 获取归档的文档数（使用 archives 条件：传入 eachFileWords，否则报错）。2. readTotalFileWords(['xx']) 排除 xx 目录（可多个，可不传参数），获取其他目录的文章字数。无默认值
      moutedEvent: '.tags-wrapper',   // 首页的站点模块挂载在某个元素后面（支持多种选择器），指的是挂载在哪个兄弟元素的后面，默认是热门标签 '.tags-wrapper' 下面，提示：'.categories-wrapper' 会挂载在文章分类下面。'.blogger-wrapper' 会挂载在博客头像模块下面
      // 下面两个选项：第一次获取访问量失败后的迭代时间
      indexIteration: 2500,   // 如果首页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 10 次后。默认 3 秒。注意：设置时间太低，可能导致访问量 + 2、+ 3 ......
      pageIteration: 2500,    // 如果文章页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 10 次后。默认 3 秒。注意：设置时间太低，可能导致访问量 + 2、+ 3 ......
      // 说明：成功获取一次访问量，访问量 + 1，所以第一次获取失败后，设置的每个隔段重新获取时间，将会影响访问量的次数。如 100 可能每次获取访问量 + 3
    },

    
    //*** 以下是Vdoing主题相关配置，文档：https://doc.xugaoyi.com/pages/a20ce8/ ***//

    // category: false, // 是否打开分类功能，默认true
    // tag: false, // 是否打开标签功能，默认true
    // archive: false, // 是否打开归档功能，默认true
    // categoryText: '博客', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'

    // pageStyle: 'line', // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

    bodyBgImg: [
      'https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
      'https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
      'https://s1.ax1x.com/2022/12/19/zL9LZV.jpg',
      'https://s1.ax1x.com/2022/12/19/zL9Hrq.jpg',
      'https://s1.ax1x.com/2023/01/20/pS8v9uq.png',
      'https://s1.ax1x.com/2023/01/19/pS8szZT.png',
      'https://s1.ax1x.com/2023/01/19/pS8yPJJ.jpg',
      'https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
    ], // body背景大图，默认无。 单张图片 String | 多张图片 Array, 多张图片时隔bodyBgImgInterval切换一张。
    bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0.1~1.0, 默认0.5
    bodyBgImgInterval: 15, // body多张背景图时的切换间隔, 默认15，单位s
    // titleBadge: false, // 文章标题前的图标是否显示，默认true
    // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
    //   '图标地址1',
    //   '图标地址2'
    // ],
    // contentBgStyle: 1, // 文章内容块的背景风格，默认无. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状

    // updateBar: { // 最近更新栏
    //   showToArticle: true, // 显示到文章页底部，默认true
    //   moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
    // },
    // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
    // sidebarOpen: false, // 初始状态是否打开左侧边栏，默认true
    pageButton: false, // 是否显示快捷翻页按钮，默认true

    // 默认外观模式（用户未在页面手动修改过模式时才生效，否则以用户设置的模式为准），可选：'auto' | 'light' | 'dark' | 'read'，默认'auto'。
    // defaultMode: 'auto',

    // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | <自定义>    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
    sidebar: 'structuring',

    // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
    author: {
      name: 'NWUzmed', // 必需
      link: 'https://github.com/nwuzmedoutlook', // 可选的
    },

    // 博主信息 (显示在首页侧边栏)
    blogger: {
      avatar: 'https://s1.ax1x.com/2023/01/06/pSAIp9K.jpg',
      name: 'NWUzmed',
      slogan: "A computer💻 hobbyist majoring in chemical engineering👨‍🔬.",
    },

    // 社交图标 (显示于博主信息栏和页脚栏。内置图标：https://doc.xugaoyi.com/pages/a20ce8/#social)
    social: {
      // iconfontCssFile: '//at.alicdn.com/t/xxx.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自己添加。阿里图片库：https://www.iconfont.cn/
      icons: [
        {
          iconClass: 'icon-bilibili',
          title: 'B站',
          link: 'https://www.bilibili.com/',
        },
        {
          iconClass: 'icon-erji',
          title: '网易云音乐',
          link: 'https://music.163.com/#/playlist?id=5388663507',
        },
        {
          iconClass: 'icon-zhihu',
          title: '知乎',
          link: 'https://www.zhihu.com/',
        },        
        {
          iconClass: 'icon-douyin',
          title: '抖音',
          link: 'https://www.douyin.com/',
        },  
        {
          iconClass: 'icon-QQ',
          title: '加Q群',
          link: 'https://qq-group.cf/',
        },          
        {
          iconClass: 'icon-youjian',
          title: '发邮件',
          link: 'mailto:nwuzmed@outlook.com',
        },
        {
          iconClass: 'icon-yuque',
          title: '语雀',
          link: 'https://www.yuque.com/dashboard',
        },
        {
          iconClass: 'icon-csdn',
          title: 'CSDN',
          link: 'https://www.csdn.net/',
        },
        {
          iconClass: 'icon-github',
          title: 'GitHub',
          link: 'https://github.com/nwuzmedoutlook',
        },
        {
          iconClass: 'icon-gitee',
          title: 'Gitee',
          link: 'https://gitee.com/NWUzmed',
        },
      ],
    },

    // 页脚信息
    footer: {
      createYear: 2016, // 博客创建年份
      copyrightInfo:
        'NWUzmed | <a href="https://github.com/nwuzmedoutlook/newdac/blob/main/LICENSE" target="_blank">MIT License</a> | <a href="https://icp.gov.moe/?keyword=20232425" target="_blank">萌ICP备20232425号</a>', // 博客版权信息、备案信息等，支持a标签或换行标签
    },

    // 扩展自动生成frontmatter。（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
    extendFrontmatter: {
      author: {
        name: 'NWUzmed',
        link: 'https://github.com/nwuzmedoutlook'
      }
    },

    // 自定义hmtl(广告)模块（公众号图片设置）
    htmlModules
  },

  // 注入到页面<head>中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
  head: [
    ['link', { rel: 'icon', href: 'https://s1.ax1x.com/2023/01/06/pSA5HcF.jpg' }], //favicons，资源放在public文件夹
    ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/font_3114978_qe0b39no76.css' }],  //代码块隐藏模块
    ['script', { src: 'https://cdn.staticfile.org/twikoo/1.6.10/twikoo.all.min.js' }],   //twikoo评论
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],  // 站点信息模块
    ['link', { rel: 'stylesheet', href: 'https://at.alicdn.com/t/font_3077305_pt8umhrn4k9.css' }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'CO2,DAC',
      },
    ],
    // ['meta', { name: 'baidu-site-verification', content: '7F55weZDDc' }], // 百度统计的站长验证（你可以去掉）
    ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色
    // [
    //   'script',
    //   {
    //     'data-ad-client': 'ca-pub-7828333725993554',
    //     async: 'async',
    //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    //   },
    // ], // 网站关联Google AdSense 与 html格式广告支持（你可以去掉）
  ],


  // 插件配置
  plugins: <UserPlugins>[
    [
      "sitemap", // 网站地图
      {
        hostname: WEB_SITE,
      },
    ],

    'vuepress-plugin-baidu-autopush', // 百度自动推送

    [
      'vuepress-plugin-baidu-tongji', // 百度统计
      {
        hm: baiduCode,
      },
    ],

    [
    	{
        	name: 'custom-plugins',
        	globalUIComponents: ["PageInfo"] // 站点信息模块，2.x 版本 globalUIComponents 改名为 clientAppRootComponentFiles
    	}
    ],
    
    [
    	{
        	name: 'custom-plugins',
        	globalUIComponents: ["BlockToggle"] // 代码块隐藏，2.x 版本 globalUIComponents 改名为 clientAppRootComponentFiles
    	}
    ],

    [
    	{
        	name: 'custom-plugins',
        	globalUIComponents: ["Twikoo"] // Twikoo评论，2.x 版本 globalUIComponents 改名为 clientAppRootComponentFiles
    	}
    ],
    
    
    // 全文搜索。 ⚠️注意：此插件会在打开网站时多加载部分js文件用于搜索，导致初次访问网站变慢。如在意初次访问速度的话可以不使用此插件！（推荐：vuepress-plugin-thirdparty-search）
    // 'fulltext-search',

    // 可以添加第三方搜索链接的搜索框（继承原官方搜索框的配置参数，即最多只能搜索到三级标题，无法搜索正文），该插件不能与fulltext-search插件同时开启，否则仅显示该插件样式
    [
      'thirdparty-search',
      {
        thirdparty: [
          {
            title: '在Bing中搜索',
            frontUrl: 'https://cn.bing.com/search?q=', // 搜索链接的前面部分
            behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
          },
          {
            title: '在百度中搜索',
            frontUrl: 'https://www.baidu.com/s?wd=',
          },
          {
            title: '在搜狗中搜索',
            frontUrl: 'https://www.sogou.com/web?query=',
          },
          {
            title: '在Google中搜索',
            frontUrl: 'https://jproxy.revth.com/-----https://ipv6.google.com/search?q=',
          },
          {
            title: '通过百度搜索本站的',
            frontUrl: `https://www.baidu.com/s?wd=site%3A${DOMAIN_NAME}%20`,
          },
        ],
      }
    ],

    [
      'one-click-copy', // 代码块复制按钮
      {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
        copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
        duration: 1000, // prompt message display time.
        showInMobile: false, // whether to display on the mobile side, default: false.
      },
    ],

    [
      'demo-block', // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
      {
        settings: {
          // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
          // cssLib: ['http://xxx'], // 在线示例中的css依赖
          // vue: 'https://fastly.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
          jsfiddle: false, // 是否显示 jsfiddle 链接
          codepen: true, // 是否显示 codepen 链接
          horizontal: false, // 是否展示为横向样式
        },
      },
    ],
    [
      'vuepress-plugin-zooming', // 放大图片
      {
        selector: '.theme-vdoing-content img:not(.no-zoom)', // 排除class是no-zoom的图片
        options: {
          bgColor: 'rgba(0,0,0,0.6)',
        },
      },
    ],
    [
      'vuepress-plugin-comment', // 评论
      {
        choosen: 'gitalk',
        options: {
          clientID: '10dfdb32c5eb06f755b2',
          clientSecret: '7db5b1325f784c12af75f496be9d5a3329097f99',
          repo: 'newdac-comments', // GitHub 仓库
          owner: 'nwuzmedoutlook', // GitHub仓库所有者
          admin: ['nwuzmedoutlook'], // 对仓库有写权限的人
          proxy: 'https://gitalk.netlify.app/github_access_token',
          // distractionFreeMode: true,
          pagerDirection: 'last', // 'first'正序 | 'last'倒序
          id: '<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>', //  页面的唯一标识,长度不能超过50
          title: '「评论」<%- frontmatter.title %>', // GitHub issue 的标题
          labels: ['Gitalk', 'Comment'], // GitHub issue 的标签
          body:
            '页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>', // GitHub issue 的内容
        },
      },
    ],
    [
      '@vuepress/last-updated', // "上次更新"时间格式
      {
        transformer: (timestamp, lang) => {
          return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
        },
      },
    ],
  ],

  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },

  // 监听文件变化并重新构建
  extraWatchFiles: [
    '.vuepress/config.ts',
    '.vuepress/config/htmlModules.ts',
  ]
})
