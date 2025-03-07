---
title: 引言
lang: zh-CN
---
# 第一章 引言
## 一、 在世界诞生之前
### A.第二版前言

> By2024-2025届技术部负责人王博涵

从大一什么都不懂的小白到后来电赛拿下校一省一的成就，单片机的学习对于我而言是一场充满曲折但又富有趣味的旅行。我大一那年参加过学院科协的嵌入式培训，课程算是我单片机学习的启蒙。每一届科技协会的技术部成员在教材上下足了功夫，旨在给学院尤其是大一的同学们一个清晰完整的嵌入式入门指南。

今年的教材将结合过去两年的精华，将曾经PDF版本的电子教材彻底迁移到学院的科协网站。当然，在大家开始进行单片机学习之前，我还是想嘱咐一些事情(当然，大概和顾雨杭同学说的大差不差，也会加入一些自己的心得想法)

#### 学习历程
对于C语言的学习，我其实学的并没有像顾雨杭同学学的那么深入，基本上只有学校教的C++的知识进行了迁移还有后期自学了一些C语言特有的东西。因此，就推荐一下顾雨杭同学首推的[南京大学计算机系统实验](https://nju-projectn.github.io/ics-pa-gitbook/ics2023/index.html)课程和[笨方法学C](https://wizardforcel.gitbooks.io/lcthw/content/)，详情说明可以看第一版前言。

对于单片机的学习，我认为对于当下阶段的我们，应该**从单片机的实践开始学习，然后再通过实践去理解理论知识**，毕竟在没有专业课基础的情况下去看理论讲解真的是看不懂啊。从我个人的经历而言，非常推荐[keysking的STM32教程](https://space.bilibili.com/6100925/lists/1025423?type=season),我也是通过这个up主的视频对单片机的实践有着更深的理解。

当然，在我们了解如何使用HAL库来实现单片机的功能之后，我们应该向理论知识进行深入学习，从寄存器编程的角度去了解单片机的底层架构。在此，我推荐[江协的STM32教程(基于标准库)](https://space.bilibili.com/383400717)和[野火的STM32教程(基于HAL库)](https://www.bilibili.com/video/BV18X4y1M763/?share_source=copy_webvd_source=4517f0b69b31c8b5e65ad7a378236261)

对于纯理论知识的讲解，这里推荐[正点原子的STM32教程](https://www.bilibili.com/video/BV1Lx411Z7Qa/?share_source=copy_web&vd_source=4517f0b69b31c8b5e65ad7a378236261)。这个教程的理解难度较大，需要反复观看，但理论知识讲解通透。

那么有人肯定会问，我需不需要理论知识全部掌握。我的回答是不需要的，学习理论知识是为了让你对单片机的理解更加深入，为了让你查错有更多的见解与想法，但对于没有专业课基础的大一同学们来说，学习单片机最重要的是**从实践出发，理论结合实践**

#### 必看的两篇文章

[提问的智慧](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)和[别像弱智一样提问](https://github.com/tangx/Stop-Ask-Questions-The-Stupid-Ways/blob/master/README.md).

也许大家在高中的时候遇到不会的题目多半会选择问同学，问老师去寻求解题思路，这对于考试而言可能没有毛病，但是对于学习单片机，工科专业，甚至你未来遇到各种困难的时候**并不是一件好事情**。

是否能够做到独立思考而不依赖他人是非常重要的，而我认为这也是作为工科学生提高个人能力的最重要的方法。从小了说，遇到问题应该自己尝试解决，实在解决不掉再去寻求他人帮助；往大了说，未来你所要学习的一切几乎都要靠自己，老师、课程、教材等起到的只是辅助作用。

我现在周围还有些同学没有养成这个习惯，我认为这是非常糟糕的。如果同学们能够在大一就有这样的独立思考，自我解决问题的能力，那么你未来的几年将会有卓越的进步！

对于学习单片机而言，你要学会STFW / RTFM / RTFSC

> STFW / RTFM / RTFSC看不懂是不是应该上网查查?

要善于利用b站的视频资源、AI、CSDN等资源来进行学习

::: tip
希望大家不要问类似于：
- 我代码报错了帮我看看哪里有问题？(你自己查报错信息了吗？)
- 我烧录不成功，IDE蹦出来个看不懂英文的界面不知道啥意思(看不懂自己就找翻译，高中学的英文就只会考试吗？)
- 这段代码看不懂写的什么意思？(有个东西叫AI，你需要有一个)
:::

当然，如果你自己已经想方设法检查了所有可能的错误发现都没有解决问题的话，你可以进行提问并说明情况或者**大胆的怀疑板子烧了！**

#### 必有的两个辅助
- AI(Chatgpt,Claude等)
- CSDN网站

### B.第一版前言

> By2023-2024届技术部负责人顾雨杭

我在大一学习嵌入式开发的过程中曾经无数次陷入迷茫. 网上的资料多而杂,
要么是花费了太多时间在这个阶段不必要的细节,
要么是太过简略以至于完全不明所以.

另一个痛苦的来源其实是你校的计算机课程教学. 几乎可以暴论,
理解嵌入式开发完全取决于**对计算机系统的认识程度**;
我在大一留下的诸多疑问一直到我学习了[**南京大学计算机系统实验**](https://nju-projectn.github.io/ics-pa-gitbook/ics2023/index.html)课程之后才得到解答.

所以我决定做一份学习资料(不如说更像是实验导引, 就像是国外学校EECS课程常有的Lab). 在这份文档中,
我会尽量做到**只讲述当前有必要的细节**,
应当交给视频去讲明白的就会交给视频去做; 应当由你自己STFW / RTFM / RTFSC.

:::tip 必做题: STFW
搜索网络, 了解一下STFW/RTFM/RTFSC几个词的意思.
:::

::: tip 收集建议
本文档目前的版本目前由科协内部使用(当然你分享出去了大家也不会说什么).

试用的一个重要目的是,
希望能收集大家在自由探索过程中真实遇到的困惑和改进建议, 这些建议会在此后
SEU-Project R 项目讲义的编写中发挥重要作用.
:::

::: info
本文档采用[CC BY-NC-SA 4.0
DEED](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans)方式公开.

*Yuhang Gu, Southeast University*
:::

::: info "总有一天我会把所有的细节搞明白的"
\"我们都是活生生的人, 从小就被不由自主地教导用最小的付出获得最大的得到,
经常会忘记我们究竟要的是什么. 我承认我完美主义,
但我想每个人心中都有那一份求知的渴望和对真理的向往,
\"大学\"的灵魂也就在于超越世俗, 超越时代的纯真和理想 --
我们不是要讨好企业的毕业生, 而是要寻找改变世界的力量.\"

--- jyy

\"教育除了知识的记忆之外, 更本质的是能力的训练, 即所谓的training.
而但凡training就必须克服一定的难度, 否则你就是在做重复劳动,
能力也不会有改变. 如果遇到难度就选择退缩,
或者让别人来替你克服本该由你自己克服的难度,
等于是自动放弃了获得training的机会,
而这其实是大学专业教育最宝贵的部分.\"

--- etone

计算机的所有东西都是人做出来的，别人能想得出来的，我也一定能想得出来，在计算机里头，没有任何黑魔法，所有的东西，只不过是我现在不知道而已，总有一天，我会把所有的细节，所有的内部的东西全都搞明白的。

--- 翁恺
:::

#### 正确提问和解决问题

#### 如何求助

在你的实验碰到问题, 需要求助之前 --- 哦不, 在开始实验之旅之前,
请先简单阅读一下这两篇文章:
[提问的智慧](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)和[别像弱智一样提问](https://github.com/tangx/Stop-Ask-Questions-The-Stupid-Ways/blob/master/README.md).

::: tip
是的, 别再问\"为什么板子上的灯亮起来了但是电脑检测不到\"这种问题了 -
仔细检查一下你连接开发板用的是数据线还是电源线( ---它们之间有什么区别? )
:::

::: warning "未测试的代码一定是错误的"
一定要记住: 机器 (除非芯片烧了) 和编译器永远是对的;
未测试的代码一定是错的; 杜邦线很有可能是连错的; 时钟有可能是忘记开了的.

不可否认的是, 嵌入式开发的软硬件结合特性和底层性注定了错误调试的难度,
但错误一定不是不可排除的黑魔法. 你有万用表, 有调试器(在单片机开发时,
你同样可以通过gdb打断点, 看内存等), 已经足够排除90% 的问题了.
剩下的交给玄学吧.
:::

#### 用正确的手段解决问题

在掌握嵌入式开发基础的同时, 我们希望你能在实验的过程中培养用正确的手段解决问题的能力. 具体的内容在此后的讲义中将会一再涉及.

## C语言基础?

毫无疑问嵌入式开发的主力是C语言. 尽管需要强调**C++和C基本上是两种语言**, 但大家大一学的C++仍然足够帮你应付嵌入式开发的入门需要了. 然而C中有两件事物仍然值得强调:

-   **指针**, 指针的本质, 数据类型的本质.
-   **结构体**, 结构体的内存分布, 结构体指针, 结构体指针和各种其他事物的互转

在此,
非常推荐访问[**笨方法学C**](https://wizardforcel.gitbooks.io/lcthw/content/)进行C语言的学习(同样会涉及一些命令行和编译器的使用小方法, 很实用). 

推荐完成**练习1-18, 31(调试器), 44环形缓冲区**的学习.

::: warning C语言和指针基础
除非你已经是写C语言的一把好手了, 否则请一定要重新学习一下! 大一学习的指针和结构体相关内容是**绝对不足以理解后续的某些内容的**.
:::

::: danger 指针与结构体
如果你没有太多时间的话, 也请一定要重看其[**练习15:
可怕的指针**](https://wizardforcel.gitbooks.io/lcthw/content/ex15.html)和[**练习16：结构体和指针**](https://wizardforcel.gitbooks.io/lcthw/content/ex16.html)和[**练习18：函数指针**](https://wizardforcel.gitbooks.io/lcthw/content/ex18.html)的内容.

不然对于之后的内容给你带来的, 可能的心灵创伤, 作者概不负责.
:::

::: tip C++可以写单片机程序吗?
一个有趣的问题: 能不能用C++写单片机程序?

答案是肯定的. 不过要完全理解这个过程还需要一些对编译过程的理解.
而且你**不能直接在C里引用C++声明的函数** --- 为什么? (事实上, 这就是你在单片机上写C++的唯一阻碍了. )

这个问题就交给两千年后的你来STFW解决吧.

不过公认的经验是, 不推荐使用C++进行嵌入式的开发. 这是由于C++ (或者其他的现代高级语言) 的模型对计算机底层的运行做了过多的抽象, 这对现代软件开发是一件好事, 对于资源及其受限的嵌入式设备而言却并非如此.
:::

## 二、 实验方案

### GPIO-梦开始的地方

-   GPIO的来世
-   精准操控之钥：GPIO寄存器详解
-   从零到一的旅程：初始化与库函数解析
-   实验-点亮智慧的光：按键控制小灯
-   GPIO的今生
-   GPIOの思

### 信息邮递员-UART及其应用

-   串口启航
-   控制大师：寄存器的魔法
-   实验1-Hello,STM32!第一个串口通信
-   实验2-DMA驾到：不定长数据不再是难题
-   串口万花筒：发现UART的无限可能
-   挑战时刻！

### 穿越时空的旅程-中断及其应用

-   正片开始: 中断
-   相关寄存器与库函数
-   实验1-古代掌管点灯的中断之神
-   实验2-串口中断实验
-   看，外部中断大放光彩！
-   请玩家解锁此挑战

### 时间守护者-定时器及其应用
- 乘凉时钟树下，聆听滴答之声
- 记忆的密码：寄存器与函数详解
- 实验1-前进还是停止？用三色小灯模拟信号灯：定时器中断实验
- 实验2-小小呼吸灯-PWM信号控制
- 创意的火花：定时器的拓展应用
- 现在到你们啦！

### 将大局逆转吧！-综合练习

## 三、 实验环境

-   操作系统: Windows / GNU/Linux
-   编程语言: C语言
-   IDE环境: Keil / STM32-CubeIDE / CLion / Visual Studio Code

## 四、 其他说明

欢迎加入科协嵌入式培训教材编写组 / Project-R 文档编写和维护组.

关于本讲义内容的问题和建议请联系当前嵌入式部分的负责人王博涵: 213220910@seu.edu.cn / 2535634982(QQ), 或是在GitHub上提出相应issue.

::: info 本章修改记录 

2024/2 第一版编写（顾雨杭）

2025/2 完成编写 (王博涵)

2025/3 网页适配 (顾雨杭) 

:::