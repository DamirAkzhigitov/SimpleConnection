export const templateItem = (innerHTML: string, className = '') => {
  if (!innerHTML) return null;

  const element = document.createElement('div');

  element.innerHTML = innerHTML;
  if (className) element.className = className;

  return element;
};
