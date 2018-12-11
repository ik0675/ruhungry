import * as types from '../types';

export const dispatchCreateChat = ids => dispatch => {
  fetch('/api/getChatNumber', {
    method: 'POST',
    header: { 'content-type': 'application/json' },
    body  : JSON.stringify(ids)
  })
  .then(data => {
    if (data.status) {
      // create or resume chat
      const chatId = data.chat_id;
      ids.splice(0, 1);
      dispatch({
        type: types.CREATE_CHAT,
        data: {
          chatId,
          ids
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
