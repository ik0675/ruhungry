import * as types from '../types';

export const dispatchCreateChat = ids => dispatch => {
  const queryIds = JSON.stringify(ids);
  fetch(`/api/getChatNumber?ids=${queryIds}`)
  .then(res => res.json())
  .then(data => {
    if (data.status) {
      // create or resume chat
      ids.splice(0, 1);
      dispatch({
        type: types.CREATE_CHAT,
        data: {
          chatId: data.chat_id,
          ids   : ids
        }
      })
    } else {
      // err
      dispatch({
        type: types.CREATE_CHAT_ERR
      })
    }
  })
}
