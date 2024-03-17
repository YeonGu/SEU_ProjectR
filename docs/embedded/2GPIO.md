---
title: 点灯工程师
lang: zh-CN
---

# 实验一 点灯工程师

点灯之于嵌入式开发就如同Hello World之于编程, 几乎是每位学习者迈出的第一步. 在这个过程中,
你将会掌握对MCU上最基本的外设 --- **GPIO**的相关操作, 延时函数的使用,
以及了解整个C代码工程的整体情况.

## 创建工程

我们所使用的Nucleo-144开发板是ST官方推出的, 基于STM32F413ZH芯片的开发板. 因此在STM32CubeMX软件中可以直接选用这个板子, 其内置的数据库会帮我们初始化一些引脚信息, 而不用自己手动配置.

关于创建工程, 初始化板子型号的步骤可以参见**STM32实验指导书**中**第四章
跑马灯实验**的内容.

## GPIO

> A general-purpose input/output (GPIO) (通用输入/输出端口) is an uncommitted digital signal pin on an integrated circuit or electronic circuit (e.g. MCUs/MPUs) board which may be used as an input or output, or both, and is controllable by software.
>
> --- Wikipedia

Wikipedia 很好地解释了GPIO的定义. 可以说, GPIO是MCU上一切功能的基石. 作为嵌入式系统, MCU需要与其他硬件模块沟通. 沟通的形式便是**在引脚和导线上变化的高低电平**. 

GPIO通过软件配置, 实现高低电平的输入/输出功能, 从而完成一系列从简单到复杂的控制和信息交流发的任务.

## 编写代码

请先观看视频:
[点亮第一颗小灯](https://www.bilibili.com/video/BV1s84y1h77Q/?share_source=copy_web&vd_source=b25682b699c98b1c6e3947c9b7b66a3a)和[闪烁的小灯](https://www.bilibili.com/video/BV1Cd4y1L7kH/?spm_id_from=333.788&vd_source=f1ae41cbb2101ee1a2a77931d719f1be).
完成视频里所演示的代码的内容. 注意: 由于**型号和开发板不同,
创建工程的过程请先参考实验指导书第四章**.

视频中展示的点灯所用到的GPIO引脚和我们使用的开发板并不一致.
在使用相应API的时候示例如下:

```  C
HAL_GPIO_WritePin ( LD1_GPIO_Port, LD1_Pin, GPIO_PIN_SET ); // 将LD1对应的GPIO设为高电平
HAL_GPIO_WritePin ( LD2_GPIO_Port, LD2_Pin, GPIO_PIN_SET ); // 将LD2对应的GPIO设为高电平
```


## 引脚和宏的使用

让我们把目光首先放在代码中`LD1_Pin`这几个类似的定义上. 很明显, `LD1_GPIO_Port`, `LD1_Pin`, `GPIO_PIN_SET`都不是本来就属于C的东西, 那么它们是如何出现的呢?

使用IDE的代码跳转功能可以轻松地帮助我们解答这个疑问. 哦!
原来它们的奥妙在**CubeMX为我们生成的源码里**:

``` C
// in main.h...
/* Private defines -----------------------------------------------------------*/
#define USER_Btn_Pin GPIO_PIN_13
#define USER_Btn_GPIO_Port GPIOC
#define LD1_Pin GPIO_PIN_0
#define LD1_GPIO_Port GPIOB
// ......
```

接着, main.c引用了main.h, 于是我们可以直接在代码里写LD1\_Pin;
在编译期间, 这些定义的宏会被自动**展开**成本应该有的样子.

::: warning 预编译指令
如果你对**预编译指令, \#define, \#include** 这些概念仍不熟悉的话,
是时候STFW了解一下了.
:::
:::tip #include 的本质
以及: \#include 的本质其实是\"复制粘贴\". 怎么理解这个概念?

它将有助于你解释你可能经常遇到的undeclared identifier, multiple
declaration 之类的问题,
以及为什么每一个头文件都需要有一个令人费解的`#ifndef...#define...#endif`.
:::


---------------

通过C中的宏, 我们实现了一种**软件的封装**. 我们当然可以把之前的代码写成:

```C
HAL_GPIO_WritePin ( GPIOB, GPIO_PIN_0, 1 ); // 将LD1对应的GPIO设为高电平
HAL_GPIO_WritePin ( GPIOB, GPIO_PIN_2, 1 ); // 将LD2对应的GPIO设为高电平
```

但这种写法很大程度上降低了代码可读性, 更重要的是破坏了**可维护性**:
如果在未来, `LD1`对应的引脚被改变了, 这是否代表着我们需要在代码里一个一个地找到`LD1`地定义, 费尽心思地改引脚?

而我们的写法则没有这种顾虑: 只需要更改 \#define 的内容, 告诉编译器`LD1`的对应定义改变了, 剩下的任务, 编译器会在启动编译时的**预编译**期间自动解决.

## 引脚的配置

接下来我们会在硬件, CubeMX, 代码三个层面理解引脚和配置.
阅读开发板原理图, 可以发现LD1被接到了PB0这个GPIO引脚.

那么代码中呢? 在上一节, 我们已经看到了:

```C
        #define LD1_Pin GPIO_PIN_0
        #define LD1_GPIO_Port GPIOB
```

我们定义的`LD1`对应的GPIO刚好是`GPIOB`端口的`PB0`! 同样地, 请你寻找开发板原理图上的 LD2, 3, 寻找它们对应的引脚和宏声明.

那么CubeMX是如何知道这一点的呢? 别忘了我们生成项目的时候勾选了 "**default
initialize peripheral**",
由于官方的开发板在数据库中已经有了LED端口的信息,
它们**在一开始就已经被配置好了**. 你可以打开CubeMX,
在Pinout&configuration一栏中寻找到这几个GPIO, 看看它们是如何被定义好的.

了解了引脚的配置, 接下来请你**使用 MCU selector** 而不是 Board selector
重新生成一个工程, **自己为LD0, 1, 2进行引脚的定义**, 并点亮这三颗LED.
指定引脚的过程可以看之前链接中的视频.

流水灯
------

到目前为止, 你已经学会了基础的点灯, 以及结合视频完成了动态变换的LED效果.
接下来请你自己完成一个流水灯: 使LD1, LD2, LD3按顺序交替点亮.

## copy-paste

到这一步, 估计你的代码已经变成了这样:
```C
HAL_GPIO_WritePin ( LD1_GPIO_Port, LD1_Pin, GPIO_PIN_SET ); // 将LD1对应的GPIO设为高电平
HAL_GPIO_WritePin ( LD2_GPIO_Port, LD2_Pin, GPIO_PIN_RESET ); // 将LD2对应的GPIO设为低电平
HAL_GPIO_WritePin ( LD3_GPIO_Port, LD3_Pin, GPIO_PIN_RESET ); // 将LD3对应的GPIO设为低电平
HAL_Delay(500); // 延时, 点亮LD2
HAL_GPIO_WritePin ( LD1_GPIO_Port, LD1_Pin, GPIO_PIN_RESET ); // 将LD1对应的GPIO设为低电平
HAL_GPIO_WritePin ( LD2_GPIO_Port, LD2_Pin, GPIO_PIN_SET ); // 将LD2对应的GPIO设为高电平
HAL_GPIO_WritePin ( LD3_GPIO_Port, LD3_Pin, GPIO_PIN_RESET ); // 将LD3对应的GPIO设为低电平
// ......
```
--- 丑到家了, 对不对? 那有没有什么办法让我们要写的东西少一点,
代码好看一点呢?

当然是有的 --- 那就是我们之前提到的**宏**.

C中的宏是无比强大的工具. 加上一点点小寄巧 --- (**宏拼接和宏参数**) ---
我们就可以把\"点灯\"的操作**封装**起来.

``` C
#define LTON(n) HAL_GPIO_WritePin ( LD##n##_GPIO_Port, LD##n##_Pin, GPIO_PIN_SET ) // 点亮LDn
#define LTOFF(n) HAL_GPIO_WritePin ( LD##n##_GPIO_Port, LD##n##_Pin, GPIO_PIN_RESET ) // 熄灭LDn
```

特别注意其中`##`的**拼接宏**用法(如果难以理解, 可以STFW). 于是原本的代码就可以写成:

``` C
LDON(1);
LDOFF(2);
LDOFF(3);
HAL_Delay(500); // 延时, 点亮LD2
LDOFF(1);
LDON(2);
LDOFF(3);
```

好看很多了, 对吧? 不过每次点亮一个灯就要写三行疑似还是有点太臭了, 让我们在此基础上再套一层宏 (使用**反斜杠可以定义多行的宏**):
```C
#ONELT(n)     \      // 点亮LDn, 熄灭其他LED
    LDOFF(1); \
    LDOFF(2); \
    LDOFF(3); \
    LDON(n);
```

于是, 本来冗长的代码经过我们的封装变成了这个优雅的模样:

```C
ONELT(1);
HAL_Delay(500);
ONELT(2);
```

:::tip 必做题: 重构代码
请用宏定义等方法重构自己的代码, 创造一个属于你的炫酷点灯程序吧!
:::

为什么要费尽心思设计这些宏? 请看本节的小标题: Copy-paste ---
指的就是本节一开始, 我们写出来的代码的样子.

经过这一番代码层面的优化,
相信聪明的你已经get到了为什么Copy-paste行为是写代码的大忌,
以及我们有哪些规避写出Copy-paste代码的手段.

当然, 解决copy-paste问题的方案不仅仅有宏. 更复杂的任务也可以交给函数去完成 --- 不过由于宏仅仅是文本展开, 而不涉及代码跳转, 毫无疑问它是**不会造成多余的计算资源消耗的**.

(不过宏会导致最终编译的代码所需的空间更大;
但是相比起嵌入式开发中金贵的计算资源而言,
这点空间的使用大部分时候算不上什么)

还有一种有趣的宏用法: **可变参数宏**. 比如:
```C
#define CASE(n, ...) \
    case n:          \
        __VA_ARGS__; \
        break;
```

于是, 我们可以把switch语句写成这样:
```C
switch (state) {
    CASE(0, ONELT(0));
    CASE(3, ONELT(1));
    CASE(4, ONELT(2));
    default:
        break;
}
```

:::tip 啊??
你可以STFW, 来弄明白发生了什么; 或者还有一种好方法 ---
**为什么不问问神奇的ChatGPT呢?**
:::

复杂的宏也许会让人一头雾水. CLion之类的现代IDE可以给出宏展开的结果;
但是一旦宏复杂起来, 就连强大的IDE也无法告诉你它本来是什么样的, 这还会影响它正常的代码提示和跳转. 在这种情况下应当如何理解复杂的宏?

想想看宏是如何被编译器所理解的 --- 它会在编译的第一步, **预处理阶段,
被编译器展开.**

那么如果我们可以**让编译器(如gcc)输出源代码预处理的结果**, 不就可以弄明白发生了什么了吗?

RTFM
----

刚才我们已经熟悉了如何使用代码操作GPIO. GPIO是MCU上最基本和重要的外设, 它通过操作输出的电平, 从而控制设备状态, 传输数字信息.

因此, 接下来的内容会继续深入GPIO的细节, 这不仅仅是为了熟悉这个外设的使用,
也是希望能带大家理解MCU的外设工作的范式, 以及最重要的 --- **学会手册的阅读和用正确的方法解决问题**.

## GPIO: 外设, 时钟和基本情况

#### GPIO

了解单片机上外设的基本情况最好的资料就是官方的**参考手册 (Reference
manual)**. 对于一个MCU, 一般会有**数据手册 Datasheet**和**参考手册
Reference manual**两种较为重要的官方参考. 前者一般说明了MCU的电气特性,
封装规格等等物理信息; 后者则更像是开发者的参考手册,
详细说明了MCU各个外设的使用情况和控制方式等, 用于编程参考.

接下来就让我们尝试阅读**参考手册**, 了解单片机上GPIO的基本情况吧.


:::tip RTFM
打开stm32f413的参考手册 (别问我去哪里找), 尝试:

1.  找到和GPIO有关的内容.
2.  控制GPIO的寄存器都有哪些? 它们都有什么样的用途?    (关于\"寄存器\"和\"控制\", 之后的内容会进一步阐释)
3.  GPIO都有一些什么特性? 它们大致都是什么意思?
4.  GPIO都有什么样的功能?
5.  目前我们所用到的GPIO输出模式仅有\"推挽\"输出(Push-pull),
    然而手册中还提到了许多其他的模式, 尝试搜索一下, 理解它们是什么意思.
    (也可以参考视频: [【推挽, 开漏, 高阻, 这都是谁想出来的词?? 】
    ](https://www.bilibili.com/video/BV1D84y1c7GV/?share_source=copy_web&vd_source=b25682b699c98b1c6e3947c9b7b66a3a))
    (你同样能在手册中看到描述基本结构的电路图,
    大二的同学应当能理解大部分了. 你可以注意到其中推挽的部分 ---
    这不就是我们数电课上学过的CMOS结构嘛!)
:::

#### 外设

接下来让我们介绍一下外设的概念.

::: tip 外设
A peripheral device, or simply peripheral, is an auxiliary hardware
device used to transfer information into and out of a computer.

The term peripheral device refers to all hardware components that are
attached to a computer and are controlled by the computer system, but
they are not the core components of the computer.

--- Wikipedia
:::

也就是说, 外设是这样的一种计算机系统的组成部分:

-   地位: 依附于计算机, 但不是core(处理器核心)的一部分.
-   控制手段: 它可以被计算机系统所控制.
-   用途: 输入/输出信息.
-   物理特性: 挂载于计算机总线 (这个之后会进行解释).

GPIO就是一种外设: 它被计算机所控制, 且用来输出/输入电平信息.

那么, MCU是如何操控GPIO外设的呢?

## GPIO: 寄存器控制 --- 外设即访存, 与计算机系统的抽象

请先阅读本文章的第一节\"输入输出\"中的内容:
[设备与输入输出](https://nju-projectn.github.io/ics-pa-gitbook/ics2023/2.5.html),
理解计算机系统中\"控制设备\"意味着什么.

对于计算机系统而言, **外设的控制即访存**. 详细一点地说, 控制一个外设的过程是这样的:

-   **CPU核心(C代码):** 向外设对应的地址读/写数据,
    和普通的**变量和指针的操作没有区别**.
-   **总线**: CPU发出的向内存读/写数据的请求会经过**总线**处理,
    发送到它实际映射到的位置(RAM运行内存, 程序存储器, 或是**外设**等).
    对MCU上的外设 (如GPIO) 而言, 这些数据就会去到地址对应的**寄存器**,
    并且读取/更改寄存器中的数据.
-   **外设模块**: 这些寄存器中的数据便是控制外设的根据. 寄存器中的**每一个bit都被赋予了特定的意义**, 外设即会根据这些控制字进行工作.

## 属于你的WritePin()

说到这里, 让我们做个有趣的任务: 实现属于自己的`WritePin()`吧.
请按照之前的开发板配置方法建立新工程, 此时三个GPIO灯的模式已经被配好(如果你对配置过程感兴趣, 可以RTFM看看GPIO端口配置寄存器相关的内容). 在这里我们只需要通过手操寄存器来实现单纯的点灯操作就可以了.

寄存器在哪里? 很快你便碰到了第一个问题. 之前我们说过, 外设即访存, 那直接用指针写一堆数据不就行了嘛 --- 不过我们连相关寄存器的地址和用处都不知道, 那怎么办呢?

别忘了, 我们之前已经阅读过Reference Manual了, 这个问题的答案也同样可以在手册中找到.

寄存器的定义 GPIO相关寄存器种类繁多.
不过Cubemx已经帮我们做好了初始化的工作,
我们只需要关注和输出电平控制有关的寄存器定义就可以了.

因此你阅读了手册目录, 发现目前需要关注的只有**GPIO 端口输出数据寄存器
(GPIOx\_ODR) (x = A\...H)**和**GPIO 端口置1/复位寄存器 (GPIOx\_BSRR) (x
= A\...H)**两个寄存器 (其他寄存器都是做什么用的呢?).

其中, ODR寄存器可以进行读写,
直接设置GPIOx的每一位引脚的输出电平(ODR中只有低16位有作用,
对应着一个GPIO端口上的16个引脚); BSRR寄存器则为只写, 在写BSRR时,
相应位对应的GPIO引脚输出直接进行置位/复位.

阅读手册中ODR和BSRR寄存器的描述, 理解这两个寄存器中每一位的功能定义.

BSRR的只写功能与我们惯常情况下所理解的\"访存(读写内存)\"有所不同(如果读BSRR,
只会获得0x0的值). 可以这么理解, [访存是一种对外设的抽象]{.underline},
在读写外设的场景下, 它不仅是单纯的\"读写内存\",
而更像是对外设功能的一种抽象描述.

寄存器地址在哪里? 开发板上的LED都连接在GPIOB端口.
所以我们只需要找GPIOB\_ODR和GPIOB\_BSRR的地址就可以了.

首先我们需要找到GPIOB的**基地址**:
所有GPIOB的相关寄存器地址都会在这个基础上加上一个偏移量得到.
偏移量在寄存器的功能说明中已经给出.

在手册的第二章2.2存储器组织架构一节, 你可以找到GPIOB的地址范围; 同时,
你也可以看到各种其他内存段的定义和声明, 有兴趣的话可以翻一翻里面有什么.
这里也有一些令人费解的新名词: AHB, APB等等, 它们都是总线的类型,
区别在于性能和功耗.

相信到这里, 你已经差不多理解了\"外设即访存\"究竟是什么意思.

#### 实现

接下来就来实现手操寄存器点灯的功能吧.

    #define GPIOB_BASE 0x ? ? ? ? ? ? ? ?         // To be implemented...
    #define GPIOx_ODR_OFFSET 0x ? ? ? ? ? ? ? ? ? // To be implemented...
    #define GET_ADDR(base, offset) (base + offset)
    #define GPIOB_REG(reg) volatile (uint32_t *)(GET_ADDR(GPIOB_BASE, GPIOx_##reg##_OFFSET))

    /**
     * @brief GPIOB的PBn引脚置位
     */
    void gpiob_set(uint8_t n) {
      // To be implemented...
    }
    /**
     * @brief GPIOB的PBn引脚复位
     */
    void gpiob_reset(uint8_t n) {
      // To be implemented...
    }
    /**
     * @brief GPIOB的PBn引脚写电平, 如果val==0则复位, 否则置位
     */
    void gpiob_write(uint8_t n, uint8_t val) {
      // To be implemented...
    }

这里提一下位操作的方法: 如果想把某个数据的某一个bit置为0, 可以像这样做:

        uint8_t target;
        // 将target的第n位设置为0
        target = (~(1 << n)) & target;

也就是说, 生成一个除了第n个bit以外都是1的数,
然后将它和target进行AND操作, 那么仅有的那个0就会将target的对应位设置为0.
(0和任何数相与结果都为0)

这样的一个\"除了第n个bit以外都是1的数\"叫做Mask(遮罩),
它说明了数据中的哪些位是为我们所需要的.

同样地, 将某一位设置成1也可以用类似的手法,
通过和\"1\"进行的**按位或**操作完成.

RTFSC (2)
---------

读一读HAL库的WritePin()和相关源码, 试着理解一下它是怎么实现的吧.
