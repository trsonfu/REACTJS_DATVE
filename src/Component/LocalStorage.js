export const saveLocal = (item) => {
  localStorage.setItem("arrSeat", JSON.stringify(item));
};
export const getLocal = () => {
  const getLocal = localStorage.getItem("arrSeat");
  if (getLocal !== "" && getLocal !== null) return JSON.parse(getLocal);
};
export const removeLocal = (key) => {
  console.log(key);
  localStorage.removeItem(key);
};
