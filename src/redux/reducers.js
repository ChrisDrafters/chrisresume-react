const defaultState = {
    dark: false,
    project: null,
    pType: 'professional'
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'setDark':
            return { ...state, dark: action.payload.dark }
        case 'setProject':
            return { ...state, project: action.payload.project }
        case 'setPType':
            return { ...state, pType: action.payload.pType }
        default:
            return state
    }
}