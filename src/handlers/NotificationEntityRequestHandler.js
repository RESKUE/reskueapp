export const NotificationEntityRequestHandler = () => {};
/**
 * Get all NotificationEntities matching the given filter- and sort-settings.
 *
 * @param {String} filter
 * @param {String} sort
 * @return {}
 */
export const GetAllNotificationEntities = ({filter, sort}) => {};
/**
 * Get the NotificationEntity with the given id.
 *
 * @param {Integer} notificationId Id of the desired Notification.
 * @return {NotificationEntity} The desired NotificationEntity.
 */
export const GetNotificationEntity = ({notificationId}) => {};
/**
 * Create the given NotificationEntity.
 *
 * @param {NotificationEntity} notification
 */
export const PostNotificationEntity = ({notification}) => {};
