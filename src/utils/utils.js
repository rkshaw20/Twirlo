import { useToast } from "@chakra-ui/react";

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

export const uploadMedia = async ({ media, updatePic,toast}) => {
  const mediaType = media.type.split('/')[0];
  if (mediaType === 'video' && Math.round(media.size / 1024000) > 10) {
  
    toast({
      title: 'Error!',
      status: 'error',
      description:'video size should be less than 10MB',
      duration: 9000,
    });
    return;
  }

  if (Math.round(media.size / 1024000) > 4) {
    
    toast({
      title: 'Error!',
      status: 'error',
      description:'video size should be less than 10MB',
      duration: 9000,
    });
    return;
  }

  const data = new FormData();
  data.append('file', media);
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
  data.append('folder', 'twirlo');
  const url =
    mediaType === 'video'
      ? `https://api.cloudinary.com/v1_1/${
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
        }/video/upload`
      : `https://api.cloudinary.com/v1_1/${
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
        }/image/upload`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });

    const json = await response.json();

    updatePic({ cloudinaryURL: json.url });
  } catch (error) {
    console.log(error);
  
    toast({
      title: 'Error!',
      status: 'error',
      description:'media uploading failed',
      duration: 9000,
    });
  }
};