export const MediaEntityRequestHandler = () => {};
/**
 * Get the MIME-Type of the media with the given id.
 *
 * @param {Integer} mediaId Id of the desired media.
 * @return {String} MIME-Type of the desired media.
 */
export const GetMediaEntityType = ({mediaId}) => {};
/**
 * Download the media with the given id.
 *
 * @param {Integer} mediaId Id of the desired media.
 * @return {MediaEntity} The desired mediaEntity.
 */
export const GetMediaEntity = ({mediaId}) => {};
/**
 * Upload the given media.
 *
 * @param {MediaEntity} media
 */
export const PostMediaEntity = ({media}) => {};
