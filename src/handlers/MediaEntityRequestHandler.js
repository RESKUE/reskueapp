const MediaEntityRequestHandler = () => {};
/**
 * Get the MIME-Type of the media with the given id.
 *
 * @param {Integer} mediaId Id of the desired media.
 * @return {String} MIME-Type of the desired media.
 */
const GetMediaEntityType = ({mediaId}) => {};
/**
 * Download the media with the given id.
 *
 * @param {Integer} mediaId Id of the desired media.
 * @return {MediaEntity} The desired mediaEntity.
 */
const GetMediaEntity = ({mediaId}) => {};
/**
 * Upload the given media.
 *
 * @param {MediaEntity} media
 */
const PostMediaEntity = ({media}) => {};
