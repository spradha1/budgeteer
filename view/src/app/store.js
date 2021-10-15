import { configureStore } from '@reduxjs/toolkit';
import trackerReducer from '../features/tracker/trackerSlice';


export default configureStore({

  reducer: {
    tracker: trackerReducer
  }

});