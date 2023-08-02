import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
}

// export const getReport = createAsyncThunk(
//     'report/setReport',
//     async function (dates: [string, string]) {
//         // const response = await api.getReport(dates[0], dates[1])
//         // return response
//     }
// )

const dataSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        // lists
        addTodoList(state, action: PayloadAction<{ title: string }>) {

        },
    },
    extraReducers: (builder) => {
        // builder
        // .addCase(getReport.pending, (state) => {
        // })
        // .addCase(getReport.fulfilled, (state, action) => {

        // })
        // .addCase(getReport.rejected, (state) => {
        // })
    }
})
export const {
} = dataSlice.actions
export default dataSlice.reducer

