const sortByDate = (posts, filterType) => {
    if (filterType === 'latest') {
      return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      return posts;
    }
  };
  
  const sortByLikeCount = (posts, filterType) => {
    if (filterType === 'trending') {
      return [...posts].sort((a, b) => b.likes.likeCount - a.likes.likeCount);
    } else {
      return posts;
    }
  };
  
  export const getFilteredPost = (posts, filterType) => {
    const filterFunctions = [sortByDate, sortByLikeCount];
    return filterFunctions.reduce((acc, func) => func(acc, filterType), posts);
  };
  