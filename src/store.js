import {configureStore} from '@reduxjs/toolkit'

import userReducer from '../src/slices/userSlice'
import podcastReducer from '../src/slices/podCastSlice';

export default configureStore({
    reducer:{
        user:userReducer,
        podcasts:podcastReducer
    },
});