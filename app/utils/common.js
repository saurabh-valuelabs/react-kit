export const readStorage = key => sessionStorage.getItem(key);

export const writeStorage = (key, value) => {
  sessionStorage.setItem(key, value);
};

export const emptyStorage = key => {
  sessionStorage.removeItem(key);
};

export const dateFormatter = dbFormatDate => {
  let formatedDate = dbFormatDate;
  const options = {
    // weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    // hour: 'numeric',
    // minute: 'numeric',
    // timeZone: 'Asia/Kolkata',
  };
  if (typeof dbFormatDate === 'string') {
    formatedDate = new Date(dbFormatDate).toLocaleString('en-IN', options);
  }

  return formatedDate;
};

export const orderNumberFormatter = orderId => {
  let result = `${orderId}`;
  switch (result.length) {
    case 1:
      result = `000${orderId}`;
      break;
    case 2:
      result = `00${orderId}`;
      break;
    case 3:
      result = `0${orderId}`;
      break;
    default:
      result = `${orderId}`;
      break;
  }
  return result;
};

export const moneyFormatter = amount => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  return formatter.format(amount);
};
