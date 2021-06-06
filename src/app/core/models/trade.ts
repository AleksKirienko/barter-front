import { Products } from './products';

export interface Trade {
  userId: number; // id пользователя для которого подобрали обмен
  sendProduct: Products; // id товара пользователя, который отдает
  receiveProduct: Products; // id товара, который получает
}
