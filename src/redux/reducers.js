const defaultState = {
    dark: false
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'setDark':
            return { ...state, dark: action.payload.dark }
        default:
            return state
    }
}