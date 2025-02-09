export const isValidObject = (item) => {
    if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
      return true;
    }
    return false;
  };
  
export const isValidArray = (item) => {
    if (Array.isArray(item) && item.length) {
      return true;
    }
    return false;
  }