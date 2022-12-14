import axios from "axios";
import { getServer } from "../util";
import { GET_PROFILE, PROFILE_ERROR, ERRORS } from "./types.js";


export const getProfile = (id) => async dispatch => {

    try {
        const res = await axios.get(`${getServer()}/api/profile/${id}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusType },
        });
    }

}

export const createProfile = (profileData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
        };
        await axios.post(`${getServer()}/api/profile`, profileData, config)
            .then((_) => window.location.href = "/dashboard/profile");

    } catch (err) {
        // const error = err.response.data.errors;
        // if (error) {
        //     dispatch({
        //         type: ERRORS,
        //         payload: error,
        //     });
        // } else {
        // dispatch({
        //     type: PROFILE_ERROR,
        //     payload: { msg: err.response.statusType },
        // });
        // }
        dispatch({
            type: PROFILE_ERROR,
            payload: { status: err.response },
        });
    }
}


export const deleteAccount = () => async (dispatch) => {
    try {
        await axios.delete(`${getServer()}/api/profile`)
            .then((_) => {
                localStorage.removeItem("toekn");
                window.location.href = "/";
                window.location.reload();

            })


    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { status: err.response },
        });
    }
}
