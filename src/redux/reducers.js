const defaultState = {
    dark: false,
    project: null
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'setDark':
            return { ...state, dark: action.payload.dark }
        case 'setProject':
            return { ...state, project: action.payload.project }
        default:
            return state
    }
}