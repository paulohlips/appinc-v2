const Types = {
    ICREMENT_DATA_GROUP: 'group/CREATE_DATA_GROUP',
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
        default:
            return state;
    }
}

export const Creators = {
    incrementDataGroup: prototype => ({
        type: Types.ICREMENT_DATA_GROUP,
        payload: { prototype },
    }),
}

