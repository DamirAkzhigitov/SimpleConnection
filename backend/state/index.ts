let initialState: { data: string[] } = {
  data: [],
};

export const changeState = (data: { data: string[] }) => {
  initialState = data;
};

export const pushToState = (data: string) => {
  // if (typeof data === 'number') {
  initialState.data.push(data);
  // }
};

export const getLastState = () => {
  return initialState;
};
