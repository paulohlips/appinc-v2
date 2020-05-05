export const Types = {
  SET_CHECKBOX_STATE: "infoVeiculoState/SET_CHECKBOX_STATE",
};

const INITIAL_STATE = {
  checked1: false,
  checked2: false,
  checked3: false,
  checked4: false,
  checked5: false,
  checked6: false,
  checked7: false,
  checked8: false,
  image: 1,
};

export default function infoVeiculoState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_CHECKBOX_STATE:
      const { data } = action;
      return {
        ...state,
        checked1: data.checked1,
        checked2: data.checked2,
        checked3: data.checked3,
        checked4: data.checked4,
        checked5: data.checked5,
        checked6: data.checked6,
        checked7: data.checked7,
        checked8: data.checked8,
        image: data.image,
      };
    default:
      return state;
  }
}

export const Creators = {
  setInfoVeiculoState: (data) => ({
    type: Types.SET_CHECKBOX_STATE,
    data,
  }),
};
