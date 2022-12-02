import _fetch from 'app/fetch';

export const fetchMakes = async () => {
  return await _fetch({
    endpoint: 'makes'
  });
};

export const fetchMake = async (id: number) => {
  return await _fetch({
    endpoint: `make/${id}`
  });
};

export const fetchModels = async (makeId: number) => {
  return await _fetch({
    endpoint: `models/${makeId}`
  });
};

export const fetchModel = async (id: number) => {
  return await _fetch({
    endpoint: `model/${id}`
  });
};