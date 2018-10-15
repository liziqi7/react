
import { type } from '../action'

const reData = (state, action) => {
    switch (action.type) {      
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            };
        default:
            return { ...state }
    }
}



export default reData;
