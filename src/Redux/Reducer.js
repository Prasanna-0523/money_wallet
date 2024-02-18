const initialState = {
    goalData: []
}

const reducer = (state = initialState, { type, ...action }) => {
    switch (type) {
        case "ADD_GOALS":
            return {
                ...state,
                goalData: action.goals
            }
        default:
            return { ...state };
    }
}

export default reducer;