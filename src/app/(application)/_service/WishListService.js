import { axiosInstance as axios } from '../../api/axios'; 

export async function loadWishlist(userId, token) {
  try {
    const response = await axios.get('/user/wishlist/viewWishlist', {
      params: { userId },
      headers: {
        Authorization: `Bearer ${token}`,
        
    'Content-Type': 'application/json',
      },
    });
    return response.data.data.products || [];
  } catch (error) {
    console.error('Error loading wishlist:', error);
    return [];
  }
}


export async function addOrRemoveProductFromWishlist(userId, productId, token) {
  try {
    const response = await axios.post(
      '/user/wishlist/addOrRemoveItem',
      {},
      {
        params: { userId, productId: productId },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response; 
  } catch (error) {
    console.error('Error adding or removing product to wishlist:', error);
    throw error;
  }
}




export async function getWishlist(userId, token) {
  return await loadWishlist(userId, token);
}

export async function clearWishlist(userId, token) {
  try {
    const wishlist = await loadWishlist(userId, token);
    for (const product of wishlist) {
      await removeProductFromWishlist(userId, product.productId, token);
    }
  } catch (error) {
    console.error('Error clearing wishlist:', error);
  }
}
