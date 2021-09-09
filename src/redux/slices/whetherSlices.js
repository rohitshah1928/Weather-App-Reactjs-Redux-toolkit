import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


//actions creator
export const fetchWeatherAction = createAsyncThunk(
    "weather/fetch",   //action Type
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            console.log("ok", process.env.REACT_APP_OPEN_WEATHER_APP)
            const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=dc37af9f4e5902cad764f58f1b2698b7`);
            return data;

        } catch (error) {
            if (!error?.response) {
                throw error

            }

            return rejectWithValue(error?.response?.data)

        }
    }

);


// slices
const weatherSlices = createSlice(

    {
        name: "weather",
        initialState: {
            data: {}
        },
        extraReducers: (builder) => {

            //pending
            builder.addCase(fetchWeatherAction.pending, (state, action) => {
                state.loading = true;
            })

            //fulfilled
            builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
                state.weather = action?.payload;
                state.loading = false;
                state.error = undefined;
            })

            //rejected
            builder.addCase(fetchWeatherAction.rejected, (state, action) => {
                state.weather = undefined;
                state.loading = false;
                state.error = action?.payload;

            })
        }
    }

)




export default weatherSlices.reducer;