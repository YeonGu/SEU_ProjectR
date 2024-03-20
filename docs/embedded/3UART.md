---
title: UART串口通讯
lang: zh-CN
---

# 实验二 UART串口通讯

在上一章,我们学会了如何初始化MCU的GPIO,利用库函数或寄存器修改特定GPIO引脚的输出电平,从而实现LED小灯的点亮与熄灭.
在本章的内容中,我们将更进一步,利用stm32的uart串口通信模块,实现stm32开发板与上位机(你的电脑)之间的通信.

## 知识准备

### 什么是通讯协议？

人与人之间的交流,需要遵循一些的规则,比如说,要使用对方能理解的语言.机器与机器间的交流(数据传输)
同样如此,需要遵循特定的规则,这种规则被称作通讯协议.

通讯协议又称通信规程,是指通信双方对数据传送控制的一种约定.约定中包括对数据格式,同步方式,
传送速度,传送步骤,检纠错方式以及控制字符定义等问题做出的统一规定,通信双方必须共同遵守.

人类的交流方式多种多样,可以面谈,可以打视频,可以发邮件,机器之间也一样,可以选择不同的通讯协议进行通讯.
本章内容中要学习的UART(Universal Asynchronous
Receiver/Transmitter,通用异步收发器),就是一种常用且简单的通讯协议.

### UART协议

UART是一种常见的串行通信接口,用于在数字系统之间进行数据传输.UART在嵌入式系统和计算机系统中广泛应用,
常用于将并行数据转换为串行数据进行传输,或者将串行数据转换为并行数据进行接收.

UART协议的规则是:通过两根信号线(通常为TX和RX)进行双向通信.发送端通过TX(传输)线发送数据,接收端通过
RX(接收)线接收数据.UART
通常以异步方式工作,即发送和接收数据时没有时钟信号同步,而是依靠发送和接收方
之间预先约定好的波特率（波特率是指每秒钟传输的比特数）来进行通信.

这段陈述很无聊,还涉及很多新知识. 不过别担心, 在视频:
[初识串口-轮询模式](https://www.bilibili.com/video/BV1Na4y1T7VQ/?spm_id_from=333.788&vd_source=a4cd8065d89f5e61e0854dbe3297fa49)
中,up主利用动画,通俗易懂地讲解了UART的基础知识.

在cubeMX的初始化选项中, 并没有"uart"这个选项, 但是你可以找到"usart".

"usart"与"uart"有什么不同? 多出来的"s"表示什么?

## 放手去做吧!

### 创建工程＆代码小练

经历了上一章的历练,你已经初步了解STM32CubeMX软件的使用方法,可以快速选择正确的开发板型号,完成工程项目的创建了.
但是串口引脚的初始化比电灯更加复杂,涉及更多的选项.
请观看[初识串口-轮询模式](https://www.bilibili.com/video/BV1Na4y1T7VQ/?spm_id_from=333.788&vd_source=a4cd8065d89f5e61e0854dbe3297fa49)
的后续部分,完成工程文件的创建和代码的编写.

注意: 由于型号和开发板不同, 创建工程的过程请参考实验指导书第六章.

通过查阅开发板原理图,我们可以看到,usart3的RX引脚为PD8,TX引脚为PD9.它们被连接到了STLINK接口(也就是你连着usb线用来烧录程序的地方).
因此,在本项目中选择usart3进行初始化,就可以很方便地利用usb串行总线与你的电脑(上位机)进行数据传输.

## 重定向printf函数

### 使用printf函数

在视频教程中,开发板和电脑(上位机)的信息交互,是通过HAL标准库中的
`HAL_UART_Receive_IT` 和\
`HAL_UART_Transmit_IT` 两个函数实现的.

接下来,我们将尝试使用C语言的标准输出流函数------printf函数来实现开发板到上位机的数据传输.

在Include处,添加如下头文件

        #include "stdio.h" 

在main函数上方,添加如下语段,完成对printf函数的重定向.
```C
#ifdef __GNUC__ 
/* With GCC, small printf (option LD Linker->Libraries->Small printf 
   set to 'Yes') calls __io_putchar() */ 
#define PUTCHAR_PROTOTYPE int __io_putchar(int ch) 
#else 
#define PUTCHAR_PROTOTYPE int fputc(int ch, FILE *f) 
#endif /* __GNUC__ */ 
 
PUTCHAR_PROTOTYPE 
{ 
  /* Place your implementation of fputc here */ 
  /* e.g. write a character to the USART3 and Loop until the end of transmission */ 
  HAL_UART_Transmit(&huart3, (uint8_t *)&ch, 1, 0xFFFF); 
 
  return ch; 
};
```
将在main函数中使用的 `HAL_UART_Transmit_IT`
全部替换为printf函数,格式如下
```c
printf("your_string\r\n");
int a = 114514;
printf("a is %d\r\n", a);
```
将程序重新编译后导入到开发板中,观察程序能否正常运行.

### 发生了什么?

C语言标准库中的printf函数通常默认将输出发送到控制台或终端,但在嵌入式系统中,
并不一定存在控制台或终端设备.这样就无法直接使用printf函数进行调试和输出信息.

在重定向printf函数的代码中:
```C
/* With GCC, small printf (option LD Linker->Libraries->Small printf 
set to 'Yes') calls __io_putchar() */
```
通过宏定义,根据是否使用`GCC`编译器,选择使用不同的输出函数.
```C
PUTCHAR_PROTOTYPE 
{ 
    /* Place your implementation of fputc here */ 
    /* e.g. write a character to the USART3 and Loop until the end of transmission */ 
    HAL_UART_Transmit(&huart3, (uint8_t *)&ch, 1, 0xFFFF); 
 
    return ch; 
}; 
```
在 `PUTCHAR_PROTOTYPE` 函数中, 实现了输出函数的具体功能. 在这段代码中,
它的作用是将一个字符发送到USART3串口(也就是我们之前选择的串口).

具体操作是调用
`HAL_UART_Transmit`函数,将字符ch发送到指定的串口,然后返回发送的字符。

最后,通过`return`语句, `PUTCHAR_PROTOTYPE`函数返回发送的字符。

### 为什么要重定向`printf()`函数?

## RTFSC (3)

阅读HAL库的 `HAL_UART_Receive_IT`和
`HAL_UART_Transmit_IT`函数的相关源码,利用互联网查阅资料,尝试理解一下它们是怎么实现的.


## 修改记录
::: info 本章修改记录
- 2024/3 完成本章编写. (王皓瑞)
- 2024/3 网页适配 (王皓瑞, 顾雨杭)
:::
