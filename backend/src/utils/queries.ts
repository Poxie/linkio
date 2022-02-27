export const SELECT_USER_BY_USERNAME = 'SELECT * FROM users WHERE username = ?';
export const SELECT_USER_BY_ID = 'SELECT * FROM users WHERE id = ?';
export const SELECT_USER_ITEM_BY_ID = 'SELECT * FROM items WHERE id = ?';
export const SELECT_USER_ITEMS_BY_USER_ID = 'SELECT * FROM items WHERE userId = ?';

export const DELETE_USER_ITEM_BY_ID = 'DELETE FROM items WHERE id = ?';