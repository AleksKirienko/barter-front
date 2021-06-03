export interface Products {
  id: number;
  name: string; // название товара
  description: string; // описание товара
  image: string; // изображение товара, url
  category: string; // категория к которой относится товар
  exchange: string; // что пользователь хочет получить за свой товар
  exchange2: string; // предложение пользователя обмена на какой нибудь товар
  fullName: string; // имя инициатора обмена
  email: string; // его почта
  liked: boolean; // добавлен ли товар в избранные
  inBasket: boolean; // добавлен ли товар в корзину
  login: string; //  логин пользователя
  response: []; // массив, в котором будут храниться отклики пользователей на данный товар
}
