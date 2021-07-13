import { LOAD_USER, LOAD_USER_PROFILE, LOGOUT_USER } from './types'
import { isAuth } from '../actions/auth'
import { userPublicProfile } from '../actions/user'
import { Dispatch } from 'redux'

export const loadUser = () => async (dispatch: Dispatch) => {
    const user = await isAuth()
    dispatch({
        type: LOAD_USER,
        payload: user,
    })
}

export const logoutUser = () => async (dispatch: Dispatch) => {
    dispatch({
        type: LOGOUT_USER,
        payload: null,
    })
}

export const loadUserProfile = () => async (dispatch: Dispatch) => {
    const username = await isAuth().username
    const userProfile = await userPublicProfile(username)
    dispatch({
        type: LOAD_USER_PROFILE,
        payload: { user: userProfile.user, blogs: userProfile.blogs },
    })
}
