export const TYPE_PRICES = {
  home: 1200,
  cafe: 1500,
  gazebo: 1200,
  covers: 500,
  custom: 3000,
} as const;

export const MATERIAL_PRICES = {
  pvc: 1.0,
  premium: 1.3,
} as const;

export const TYPE_NAMES = {
  home: "Для частного дома",
  cafe: "Для кафе и ресторанов",
  gazebo: "Для беседок и террас",
  covers: "Защитные ПВХ пленки",
  custom: "Чехлы и тенты на заказ",
} as const;

export const MATERIAL_NAMES = {
  pvc: "ПВХ стандарт",
  premium: "ПВХ премиум",
} as const;

export default {
  TYPE_PRICES,
  MATERIAL_PRICES,
  TYPE_NAMES,
  MATERIAL_NAMES,
};