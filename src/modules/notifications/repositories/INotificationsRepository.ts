import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '../dtos/ICreateNotficationDTO';

export default interface INotificationsRepositoru {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
