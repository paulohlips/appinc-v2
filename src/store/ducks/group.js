const Types = {
  ICREMENT_DATA_GROUP: "group/ICREMENT_DATA_GROUP",
  DECREMENT_DATA_GROUP: "group/DECREMENT_DATA_GROUP",
  SAVE_DATA_GROUP: "group/SAVE_DATA_GROUP",
  FLAG_DATA_GROUP: "group/FLAG_DATA_GROUP",
  CREATE_DATA_GROUP: "group/CREATE_DATA_GROUP",
  CONTROLL_ARRAY_GROUP: "group/CONTROLL_ARRAY_GROUP",
};

const INITIAL_STATE = {
  dataGroup: [],
  flagGroup: null,
};

export default function groupState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.CREATE_DATA_GROUP:
      return {
          ...state,
        dataGroup: [
          ...state.dataGroup,
          {
            key: action.payload.key,
            prototype: action.payload.prototype,
            value: [
              {
                ...action.payload.prototype,
                index: Math.random()
              }
            ]
          }
        ]
      };
    case Types.ICREMENT_DATA_GROUP: {
        const arrayDataGroup = increment(action.payload.groupName, state)
        return {
            ...state,
            dataGroup: arrayDataGroup,
        };
    }
    case Types.DECREMENT_DATA_GROUP: {
      const array = decrement(action.payload.id, state);
      return { ...state, dataGroup: array };
    }
    case Types.SAVE_DATA_GROUP: {
      // console.log(['action save', action.payload.data]);
      const array = saveData(action.payload.data, state);
      // console.log(['return function', array]);
      return { ...state, dataGroup: array };
    }
    case Types.FLAG_DATA_GROUP: {
        const size = controlArray(state);
        console.tron.log('size group', size)
        return { ...state, flagGroup: size };
    }
    case Types.CONTROLL_ARRAY_GROUP: {
        return {
            ...state,
            flagGroup: state.flagGroup === 0 ? null : state.flagGroup - 1,
        }
    }     
    default:
      return state;
  }
}

export const Creators = {
  createDataGroup: (key, prototype) => ({
    type: Types.CREATE_DATA_GROUP,
    payload: { key, prototype }
  }),
  incrementDataGroup: groupName => ({
    type: Types.ICREMENT_DATA_GROUP,
    payload: { groupName }
  }),
  decrementDataGroup: id => ({
    type: "", //Types.DECREMENT_DATA_GROUP,
    payload: { id }
  }),
  saveDataGroup: data => ({
    type: Types.SAVE_DATA_GROUP,
    payload: { data }
  }),
  activeFlag: () => ({
    type: Types.FLAG_DATA_GROUP,
  }),
  startControlArrayGroup: () => ({
    type: Types.CONTROLL_ARRAY_GROUP,
  }),
};


const increment = (groupName, state) => {
    var arrayState = state.dataGroup
    arrayState.map(group => {
        if(group.key === groupName) {
            group.value.push({
                ...group.prototype,
                index: Math.random(),
            })
        }
    })

    return arrayState;
}

const decrement = (id, state) => {
  var arrayState = state.dataGroup;
  let count = 0;
  arrayState.map(item => {
    if (item.index === id) {
      arrayState.splice(count, 1);
    }
    count += 1;
  });
  console.log(arrayState);
  return arrayState;
};

const saveData = (info, state) => {
    const {
        index, 
        groupMother,
        name,
        data,
    } = info;

    var arrayState = state.dataGroup;

    arrayState.map(group => {
        if (group.key === groupMother) {
            group.value.map(itemGroup => {
                if(itemGroup.index === index) {
                    Object.keys(itemGroup).map(keyName => {
                        if(keyName === name) {
                            itemGroup[keyName] = {
                                key: keyName,
                                value: data,
                                filled: true,
                            }
                        }
                    })
                }
            })
        }
    })
    //console.tron.log('arrayState for group', arrayState)
  return arrayState;
};

const controlArray = state => {
    const arrayGroup = state.flagGroup;
    let count = 0;
    if(!arrayGroup) {
        const dataGroup = state.dataGroup;
        dataGroup.map( item => {
            console.tron.log('item', item)
            item.value.map(item2 => {
                console.tron.log('item2', item2)
                Object.keys(item2).map(key => {                   
                    if (key !== 'index') {
                        count += 1;
                    }
                })
            })
        })
    }
    return count;
}
/*
const saveData = (data, state) => {
  var arrayState = state.dataGroup;
  arrayState.map(item => {
    if (item.index === data.index) {
      item[data.name] = {
        key: data.name,
        value: data.data,
        filled: true,
        extra: data.extra
      };
    }
  });
  return arrayState;
};

-------------------------------------------------

group.dataGroup.map(group => {
    console.log(['group mae', group, info.data_name])
    if (group.key === groupMother) {
        group.value.map(itemGroup => {
            console.tron.log(' vendo cada item', itemGroup)
            if (itemGroup.index === index) {
                console.tron.log('chequei index', itemGroup.index, index)
            }
        })
        //saveDataGroup({ index, name: info.data_name, data: inputSave })
    }
});


*/