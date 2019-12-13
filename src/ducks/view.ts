const TOGGLE_BOOKED_SERVICES_COLLAPSE = 'TOGGLE_BOOKED_SERVICES_COLLAPSE';

const initialState = {
    bookedServices: {
        collapsed: false,
    },
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case TOGGLE_BOOKED_SERVICES_COLLAPSE:
            const collapsed = state.bookedServices.collapsed;
            return {
                ...state,
                bookedServices: {
                    ...state.bookedServices,
                    collapsed: !collapsed,
                },
            };
        default:
            return state;
    }
}

export const toggleBookedServices = () => (dispatch: any) =>
    dispatch({
        type: TOGGLE_BOOKED_SERVICES_COLLAPSE,
    });
