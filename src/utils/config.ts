export const SERVER_CONFIG = {
  BASE_URL: `https://norma.nomoreparties.space/api/`,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

// WebSocket
export const WSS_FOR_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all';
export const WSS_FOR_PROFILE_ORDERS = 'wss://norma.nomoreparties.space/orders';

export const ingredientTabs = [
  {
    name: 'Булки',
    type: 'bun'
  },
  {
    name: 'Соусы',
    type: 'sauce'
  },
  {
    name: 'Начинки',
    type: 'main'
  }
];

export const PATH = {
  FEED: '/feed',
  FEED_ORDER: '/feed/:id',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/',
  INGREDIENT: '/ingredients/:id',
  LOGIN: '/login',
  LOGOUT: '/auth/logout',
  ORDER: '/profile/orders/:id',
  ORDERS: '/profile/orders',
  PROFILE: '/profile',
  REGISTER: '/register',
  RESET_PASSWORD: '/reset-password'
};
