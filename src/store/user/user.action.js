import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) => {
    //return an object include type and payload
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
}