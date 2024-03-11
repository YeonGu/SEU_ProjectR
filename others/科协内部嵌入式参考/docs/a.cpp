#define GPIOB_BASE 0x ? ? ? ? ? ? ? ?         // To be implemented...
#define GPIOx_ODR_OFFSET 0x ? ? ? ? ? ? ? ? ? // To be implemented...
#define GET_ADDR(base, offset) (base + offset)
#define GPIOB_REG(reg) GET_ADDR(GPIOB_BASE, GPIOx_##reg##_OFFSET)

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