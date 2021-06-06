export interface Trade {
  userId: number; // id пользователя для которого подобрали обмен
  sendId: number; // id товара пользователя, который отдает
  receiveId: number; // id товара, который получает
}
