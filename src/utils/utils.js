export const setLocalStorage = (name, data) =>
  localStorage.setItem(name, JSON.stringify(data));

export const getLocalStorage = name => JSON.parse(localStorage.getItem(name));

export const removeLocalStorage = name => localStorage.removeItem(name);

export const getHumanizeTimeForOlderPost = (currentDate, date) => {
  const pastDate = new Date(date);
  const timeDifference = currentDate - pastDate;
  if (timeDifference < 86400000) {
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);

    if (hoursDifference === 0) {
      return `${minutesDifference}m`;
    } else {
      return `${hoursDifference}h`;
    }
  } else {
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysDifference > 30) {
      const options = { day: 'numeric', month: 'long' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      return formattedDate;
    } else {
      return `${daysDifference}d`;
    }
  }
};

export const getFollowing = user => user.following.map(({ _id }) => _id);
