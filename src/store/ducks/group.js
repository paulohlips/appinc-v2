const Types = {
    ICREMENT_DATA_GROUP: 'group/ICREMENT_DATA_GROUP',
    DECREMENT_DATA_GROUP: 'group/DECREMENT_DATA_GROUP'
}

const INITIAL_STATE = {
    dataGroup: [],
}

export default function groupState(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.ICREMENT_DATA_GROUP:
            return { 
                ...state,
                dataGroup: [
                    ...state.dataGroup,
                    action.payload.prototype,
                ]
            };
        case Types.DECREMENT_DATA_GROUP: {
            const array = decrement(action.payload.id, state);
            return { ...state, dataGroup: array };
        }    
        default:
            return state;
    }
}

export const Creators = {
    incrementDataGroup: prototype => ({
        type: Types.ICREMENT_DATA_GROUP,
        payload: { prototype },
    }),
    decrementDataGroup: id => ({
        type: Types.DECREMENT_DATA_GROUP,
        payload: { id },
    })
}

const decrement = (id, state) => {
    var arrayState = state.dataGroup;
    arrayState.map(item => {
      if (item.index === id) {
        arrayState.splice(item.index, 1);
      }
    });
    return arrayState;
}