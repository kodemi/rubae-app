import * as moment from 'moment';

import {
    getAdditionalServices as _getAdditionalServices,
    getBookedServices as _getBookedServices,
    getEquipment as _getEquipement,
    saveAutoPass as _saveAutoPass,
    saveBadge as _saveBadge,
    saveCatalogue as _saveCatalogue,
    saveContractor as _saveContractor,
    saveElectricity as _saveElectricity,
    saveEquipment as _saveEquipment,
    savePersonalPass as _savePersonalPass,
    saveServices,
    saveVIPParking as _saveVIPParking,
} from '../api';

const GET_BOOKED_SERVICES_REQUEST = 'GET_BOOKED_SERVICES_REQUEST';
const GET_BOOKED_SERVICES_SUCCESS = 'GET_BOOKED_SERVICES_SUCCESS';
const GET_BOOKED_SERVICES_ERROR = 'GET_BOOKED_SERVICES_ERROR';
const RESET_BOOKED_SERVICES = 'RESET_BOOKED_SERVICES';

const SAVE_CATALOGUE_REQUEST = 'SAVE_CATALOGUE_REQUEST';
const SAVE_CATALOGUE_SUCCESS = 'SAVE_CATALOGUE_SUCCESS';
const SAVE_CATALOGUE_ERROR = 'SAVE_CATALOGUE_ERROR';

const SAVE_CONTRACTOR_REQUEST = 'SAVE_CONTRACTOR_REQUEST';
const SAVE_CONTRACTOR_SUCCESS = 'SAVE_CONTRACTOR_SUCCESS';
const SAVE_CONTRACTOR_ERROR = 'SAVE_CONTRACTOR_ERROR';

const SAVE_ELECTRICITY_REQUEST = 'SAVE_ELECTRICITY_REQUEST';
const SAVE_ELECTRICITY_SUCCESS = 'SAVE_ELECTRICITY_SUCCESS';
const SAVE_ELECTRICITY_ERROR = 'SAVE_ELECTRICITY_ERROR';

const GET_EQUIPMENT_REQUEST = 'GET_EQUIPMENT_REQUEST';
const GET_EQUIPMENT_SUCCESS = 'GET_EQUIPMENT_SUCCESS';
const GET_EQUIPMENT_ERROR = 'GET_EQUIPMENT_ERROR';
const ORDER_EQUIPMENT = 'ORDER_EQUIPMENT';
const SAVE_EQUIPMENT_REQUEST = 'SAVE_EQUIPMENT_REQUEST';
const SAVE_EQUIPMENT_SUCCESS = 'SAVE_EQUIPMENT_SUCCESS';
const SAVE_EQUIPMENT_ERROR = 'SAVE_EQUIPMENT_ERROR';
const RESET_BOOKED_EQUIPMENT = 'RESET_BOOKED_EQUIPMENT';
const REMOVE_EQUIPMENT = 'REMOVE_EQUIPMENT';
const UPDATE_EQUIPMENT = 'UPDATE_EQUIPMENT';

const SAVE_BADGES_REQUEST = 'SAVE_BADGES_REQUEST';
const SAVE_BADGES_SUCCESS = 'SAVE_BADGES_SUCCESS';
const SAVE_BADGES_ERROR = 'SAVE_BADGES_ERROR';

const SAVE_AUTO_PASSES_REQUEST = 'SAVE_AUTO_PASSES_REQUEST';
const SAVE_AUTO_PASSES_SUCCESS = 'SAVE_AUTO_PASSES_SUCCESS';
const SAVE_AUTO_PASSES_ERROR = 'SAVE_AUTO_PASSES_ERROR';

const SAVE_PERSONAL_PASSES_REQUEST = 'SAVE_PERSONAL_PASSES_REQUEST';
const SAVE_PERSONAL_PASSES_SUCCESS = 'SAVE_PERSONAL_PASSES_SUCCESS';
const SAVE_PERSONAL_PASSES_ERROR = 'SAVE_PERSONAL_PASSES_ERROR';

const SAVE_VIP_PARKING_REQUEST = 'SAVE_VIP_PARKING_REQUEST';
const SAVE_VIP_PARKING_SUCCESS = 'SAVE_VIP_PARKING_SUCCESS';
const SAVE_VIP_PARKING_ERROR = 'SAVE_VIP_PARKING_ERROR';

const GET_ADDITIONAL_SERVICES_REQUEST = 'GET_ADDITIONAL_SERVICES_REQUEST';
const GET_ADDITIONAL_SERVICES_SUCCESS = 'GET_ADDITIONAL_SERVICES_SUCCESS';
const GET_ADDITIONAL_SERVICES_ERROR = 'GET_ADDITIONAL_SERVICES_ERROR';
const ORDER_ADDITIONAL_SERVICES = 'ORDER_ADDITIONAL_SERVICES';
const SAVE_ADDITIONAL_SERVICES_REQUEST = 'SAVE_ADDITIONAL_SERVICES_REQUEST';
const SAVE_ADDITIONAL_SERVICES_SUCCESS = 'SAVE_ADDITIONAL_SERVICES_SUCCESS';
const SAVE_ADDITIONAL_SERVICES_ERROR = 'SAVE_ADDITIONAL_SERVICES_ERROR';
const RESET_BOOKED_ADDITIONAL_SERVICES = 'RESET_BOOKED_ADDITIONAL_SERVICES';
const REMOVE_ADDITIONAL_SERVICES = 'REMOVE_ADDITIONAL_SERVICES';
const UPDATE_ADDITIONAL_SERVICES = 'UPDATE_ADDITIONAL_SERVICES';

const initialState = {
    loaded: false,
    loading: false,
    error: null,
    services: [],
    stand: {
        name: '',
        area: 1,
        type: null,
    },
    catalogue: {
        loading: false,
        error: null,
        en: {
            name: '',
            description: '',
            city: '',
        },
        ru: {
            name: '',
            description: '',
            city: '',
        },
        country: '',
        email: '',
        tel: '',
        website: '',
        services: {
            catalogueAdPage05: 0,
            catalogueAdPage1: 0,
        },
    },
    contractor: {
        enabled: false,
        sent: false,
        approved: false,
        loading: false,
        error: null,
        name: '',
        contact: '',
        tel: '',
        email: '',
    },
    electricity: {
        loading: false,
        error: null,
        services: [
            {
                code: 'none',
                nameRu: 'Не требуется',
                nameEn: 'Not required',
            },
            {
                code: 'electricity_5',
                nameRu: 'Электропитание до 5 кВт/200В включительно',
                nameEn: 'Power supply up to 5 kW/220V inclusively',
                price: 200,
            },
            {
                code: 'electricity_6-10',
                nameRu: 'Электропитание 6-10 кВт/200В включительно',
                nameEn: 'Power supply 6-10 kW/220V inclusively',
                price: 350,
            },
            {
                code: 'electricity_11-20',
                nameRu: 'Электропитание 11-20 кВт/200В включительно',
                nameEn: 'Power supply 11-20 kW/220V inclusively',
                price: 480,
            },
            {
                code: 'electricity_21-40',
                nameRu: 'Электропитание 21-40 кВт/200В включительно',
                nameEn: 'Power supply 21-40 kW/220V inclusively',
                price: 600,
            },
            {
                code: 'electricity_41-60',
                nameRu: 'Электропитание 41-60 кВт/200В включительно',
                nameEn: 'Power supply 41-60 kW/220V inclusively',
                price: 1000,
            },
        ],
        service: null,
    },
    equipment: {
        saving: false,
        loading: false,
        error: null,
        loaded: false,
        items: [],
        booked: [],
        empty: true,
    },
    badges: {
        quota: 0,
        items: [],
        price: 0,
        guestValue: 0,
        loading: false,
        error: null,
    },
    autoPasses: {
        types: [],
        items: [],
        loading: false,
        error: null,
    },
    personalPasses: {
        loading: false,
        error: null,
        services: {
            pass: {},
            vest: {},
        },
        items: [],
    },
    vipParking: {
        loading: false,
        error: null,
        available: 0,
        price: 0,
        value: 0,
    },
    additionalServices: {
        saving: false,
        loading: false,
        error: null,
        loaded: false,
        items: [],
        booked: [],
        empty: true,
    },
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case GET_BOOKED_SERVICES_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_BOOKED_SERVICES_SUCCESS:
            const bookedEquipment = getBookedEquipment(action.payload);
            const bookedAdditionalServices = getBookedAdditionalServices(
                action.payload
            );
            return {
                ...state,
                loading: false,
                loaded: true,
                stand: action.payload.stand,
                badges: { ...state.badges, ...action.payload.badges },
                services: [...action.payload.services],
                catalogue: {
                    ...state.catalogue,
                    ...action.payload.catalogue,
                    services: getCatalogueServices(action.payload),
                },
                contractor: {
                    ...state.contractor,
                    ...action.payload.contractor,
                    sent: !!action.payload.contractor,
                    enabled: isContractorEnabled(action.payload),
                },
                electricity: {
                    ...state.electricity,
                    service: getElectricityService(
                        state.electricity.services,
                        action.payload.services
                    ),
                },
                equipment: {
                    ...state.equipment,
                    booked: bookedEquipment,
                    empty: !bookedEquipment.length,
                },
                autoPasses: {
                    ...state.autoPasses,
                    ...action.payload.autoPasses,
                },
                personalPasses: {
                    ...state.personalPasses,
                    ...action.payload.personalPasses,
                },
                vipParking: {
                    ...state.vipParking,
                    ...action.payload.vipParking,
                },
                additionalServices: {
                    ...state.additionalServices,
                    ...action.payload.additionalServices,
                    booked: bookedAdditionalServices,
                    empty: !bookedAdditionalServices.length,
                },
            };
        case GET_BOOKED_SERVICES_ERROR:
            return { ...state, loading: false, error: action.payload };
        case RESET_BOOKED_SERVICES:
            return initialState;
        case SAVE_CATALOGUE_REQUEST:
            return {
                ...state,
                catalogue: {
                    ...state.catalogue,
                    ...action.payload,
                    loading: true,
                    error: null,
                },
            };
        case SAVE_CATALOGUE_SUCCESS:
            return {
                ...state,
                catalogue: {
                    ...state.catalogue,
                    loading: false,
                },
            };
        case SAVE_CATALOGUE_ERROR:
            return {
                ...state,
                catalogue: {
                    ...state.catalogue,
                    loading: false,
                    error: action.payload,
                },
            };
        case SAVE_CONTRACTOR_REQUEST:
            return {
                ...state,
                contractor: {
                    ...state.contractor,
                    ...action.payload,
                    loading: true,
                    error: null,
                },
            };
        case SAVE_CONTRACTOR_SUCCESS:
            return {
                ...state,
                contractor: {
                    ...state.contractor,
                    loading: false,
                },
            };
        case SAVE_CONTRACTOR_ERROR:
            return {
                ...state,
                contractor: {
                    ...state.contractor,
                    loading: false,
                    error: action.payload,
                },
            };
        case SAVE_ELECTRICITY_REQUEST:
            return {
                ...state,
                electricity: {
                    ...state.electricity,
                    loading: true,
                    error: null,
                    service: action.payload.service,
                },
            };
        case SAVE_ELECTRICITY_SUCCESS:
            return {
                ...state,
                electricity: {
                    ...state.electricity,
                    loading: false,
                },
            };
        case SAVE_ELECTRICITY_ERROR:
            return {
                ...state,
                electricity: {
                    ...state.electricity,
                    loading: false,
                    error: action.payload,
                },
            };
        case GET_EQUIPMENT_REQUEST:
            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    loading: true,
                    error: null,
                },
            };
        case GET_EQUIPMENT_SUCCESS:
            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    loading: false,
                    loaded: true,
                    items: action.payload,
                },
            };
        case GET_EQUIPMENT_ERROR:
            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    loading: false,
                    error: action.payload,
                },
            };
        case ORDER_EQUIPMENT:
            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    booked: [...state.equipment.booked, action.payload],
                },
            };
        case REMOVE_EQUIPMENT:
            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    booked: state.equipment.booked.filter(
                        (item: any) => item.code !== action.payload.code
                    ),
                },
            };
        case UPDATE_EQUIPMENT:
            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    booked: state.equipment.booked.map((item: any) =>
                        item.code === action.payload.code
                            ? { ...item, value: action.payload.value }
                            : item
                    ),
                },
            };
        case RESET_BOOKED_EQUIPMENT:
            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    booked: getBookedEquipment(state),
                },
            };
        case SAVE_EQUIPMENT_REQUEST:
            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    saving: true,
                    error: null,
                },
            };
        case SAVE_EQUIPMENT_SUCCESS:
            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    saving: false,
                },
            };
        case SAVE_EQUIPMENT_ERROR:
            return {
                ...state,
                equipment: {
                    ...state.equipment,
                    saving: false,
                    error: action.payload,
                },
            };
        case SAVE_BADGES_REQUEST:
            return {
                ...state,
                badges: {
                    ...state.badges,
                    loading: true,
                    error: null,
                },
            };
        case SAVE_BADGES_SUCCESS:
            return {
                ...state,
                badges: {
                    ...state.badges,
                    loading: false,
                },
            };
        case SAVE_BADGES_ERROR:
            return {
                ...state,
                badges: {
                    ...state.badges,
                    loading: false,
                    error: action.payload,
                },
            };
        case SAVE_AUTO_PASSES_REQUEST:
            return {
                ...state,
                autoPasses: {
                    ...state.autoPasses,
                    loading: true,
                    error: null,
                },
            };
        case SAVE_AUTO_PASSES_SUCCESS:
            return {
                ...state,
                autoPasses: {
                    ...state.autoPasses,
                    loading: false,
                },
            };
        case SAVE_AUTO_PASSES_ERROR:
            return {
                ...state,
                autoPasses: {
                    ...state.autoPasses,
                    loading: false,
                    error: action.payload,
                },
            };
        case SAVE_PERSONAL_PASSES_REQUEST:
            return {
                ...state,
                personalPasses: {
                    ...state.personalPasses,
                    loading: true,
                    error: null,
                },
            };
        case SAVE_PERSONAL_PASSES_SUCCESS:
            return {
                ...state,
                personalPasses: {
                    ...state.personalPasses,
                    loading: false,
                },
            };
        case SAVE_PERSONAL_PASSES_ERROR:
            return {
                ...state,
                personalPasses: {
                    ...state.personalPasses,
                    loading: false,
                    error: action.payload,
                },
            };
        case SAVE_VIP_PARKING_REQUEST:
            return {
                ...state,
                vipParking: {
                    ...state.vipParking,
                    loading: true,
                    error: null,
                    value: action.payload.value,
                },
            };
        case SAVE_VIP_PARKING_SUCCESS:
            return {
                ...state,
                vipParking: {
                    ...state.vipParking,
                    loading: false,
                },
            };
        case SAVE_VIP_PARKING_ERROR:
            return {
                ...state,
                vipParking: {
                    ...state.vipParking,
                    loading: false,
                    error: action.payload,
                },
            };
        case GET_ADDITIONAL_SERVICES_REQUEST:
            return {
                ...state,
                additionalServices: {
                    ...state.additionalServices,
                    loading: true,
                    error: null,
                },
            };
        case GET_ADDITIONAL_SERVICES_SUCCESS:
            return {
                ...state,
                additionalServices: {
                    ...state.additionalServices,
                    loading: false,
                    loaded: true,
                    items: action.payload,
                },
            };
        case GET_ADDITIONAL_SERVICES_ERROR:
            return {
                ...state,
                additionalServices: {
                    ...state.additionalServices,
                    loading: false,
                    error: action.payload,
                },
            };
        case ORDER_ADDITIONAL_SERVICES:
            return {
                ...state,
                additionalServices: {
                    ...state.additionalServices,
                    booked: [
                        ...state.additionalServices.booked,
                        action.payload,
                    ],
                },
            };
        case REMOVE_ADDITIONAL_SERVICES:
            return {
                ...state,
                additionalServices: {
                    ...state.additionalServices,
                    booked: state.additionalServices.booked.filter(
                        (item: any) => item.id !== action.payload.id
                    ),
                },
            };
        case UPDATE_ADDITIONAL_SERVICES:
            return {
                ...state,
                additionalServices: {
                    ...state.additionalServices,
                    booked: state.additionalServices.booked.map((item: any) =>
                        item.id === action.payload.id
                            ? { ...item, ...action.payload }
                            : item
                    ),
                },
            };
        case RESET_BOOKED_ADDITIONAL_SERVICES:
            return {
                ...state,
                additionalServices: {
                    ...state.additionalServices,
                    booked: getBookedAdditionalServices(state),
                },
            };
        case SAVE_ADDITIONAL_SERVICES_REQUEST:
            return {
                ...state,
                additionalServices: {
                    ...state.additionalServices,
                    saving: true,
                    error: null,
                },
            };
        case SAVE_ADDITIONAL_SERVICES_SUCCESS:
            return {
                ...state,
                additionalServices: {
                    ...state.additionalServices,
                    saving: false,
                },
            };
        case SAVE_ADDITIONAL_SERVICES_ERROR:
            return {
                ...state,
                additionalServices: {
                    ...state.additionalServices,
                    saving: false,
                    error: action.payload,
                },
            };
        default:
            return state;
    }
};

export const getBookedServices = () => (dispatch: any) => {
    dispatch({
        type: GET_BOOKED_SERVICES_REQUEST,
    });
    return _getBookedServices()
        .then((data) => {
            dispatch({ type: GET_BOOKED_SERVICES_SUCCESS, payload: data });
        })
        .catch((error) => {
            dispatch({ type: GET_BOOKED_SERVICES_ERROR, payload: error });
            console.log('Error', error); //tslint:disable-line
        });
};

export const resetBookedServices = () => ({
    type: RESET_BOOKED_SERVICES,
});

export const saveCatalogue = (data: any) => (dispatch: any) => {
    dispatch({
        type: SAVE_CATALOGUE_REQUEST,
        payload: data,
    });
    return _saveCatalogue(data)
        .then(() => {
            return _getBookedServices().then((res) => {
                dispatch({ type: GET_BOOKED_SERVICES_SUCCESS, payload: res });
                dispatch({ type: SAVE_CATALOGUE_SUCCESS });
                return null;
            });
        })
        .catch((error: any) => {
            dispatch({ type: SAVE_CATALOGUE_ERROR, payload: error });
            return error;
        });
};

const getCatalogueServices = (data: any) => {
    return {
        catalogueAdPage05: (
            data.services.find(
                (item: any) => item.code === 'catalogueAdPage05'
            ) || { value: initialState.catalogue.services.catalogueAdPage05 }
        ).value,
        catalogueAdPage1: (
            data.services.find(
                (item: any) => item.code === 'catalogueAdPage1'
            ) || { value: initialState.catalogue.services.catalogueAdPage1 }
        ).value,
    };
};

export const saveContractor = (data: any) => (dispatch: any) => {
    dispatch({
        type: SAVE_CONTRACTOR_REQUEST,
        payload: data,
    });
    return _saveContractor(data)
        .then(() => {
            return _getBookedServices().then((res) => {
                dispatch({ type: GET_BOOKED_SERVICES_SUCCESS, payload: res });
                dispatch({ type: SAVE_CONTRACTOR_SUCCESS });
                return null;
            });
        })
        .catch((error: any) => {
            dispatch({ type: SAVE_CONTRACTOR_ERROR, payload: error });
            return error;
        });
};

const isContractorEnabled = (data: any) => {
    const spaceOnly = data.services.find(
        ({ code }: any) => code === 'spaceOnly'
    );
    return !!spaceOnly;
};

export const saveElectricity = (data: any) => (dispatch: any) => {
    dispatch({
        type: SAVE_ELECTRICITY_REQUEST,
        payload: data,
    });
    return _saveElectricity(data)
        .then(() => {
            return _getBookedServices().then((res) => {
                dispatch({ type: GET_BOOKED_SERVICES_SUCCESS, payload: res });
                dispatch({ type: SAVE_ELECTRICITY_SUCCESS });
                return null;
            });
        })
        .catch((error: any) => {
            dispatch({ type: SAVE_ELECTRICITY_ERROR, payload: error });
            return error;
        });
};

const getElectricityService = (services: any[], bookedServices: any[]) => {
    const service = bookedServices.find(({ code }: any) =>
        services.find((item: any) => item.code === code)
    );
    return service || null;
};

export const getEquipment = () => (dispatch: any) => {
    dispatch({
        type: GET_EQUIPMENT_REQUEST,
    });
    _getEquipement()
        .then(({ data }: any) =>
            dispatch({ type: GET_EQUIPMENT_SUCCESS, payload: data })
        )
        .catch((error: any) =>
            dispatch({ type: GET_EQUIPMENT_ERROR, payload: error })
        );
};

export const getBookedEquipment = (data: any) => {
    return data.services.filter(({ type }: any) => type === 'equipment');
};

export const orderEquipment = (item: any, rootGroup: any) => (
    dispatch: any
) => {
    dispatch({
        type: ORDER_EQUIPMENT,
        payload: {
            ...item,
            value: 1,
            rootGroup: {
                nameRu: rootGroup.nameRu,
                nameEn: rootGroup.nameEn,
                code: rootGroup.code,
            },
        },
    });
};

export const resetBookedEquipment = () => (dispatch: any) => {
    dispatch({
        type: RESET_BOOKED_EQUIPMENT,
    });
};

export const removeEquipment = (item: any) => (dispatch: any) => {
    dispatch({
        type: REMOVE_EQUIPMENT,
        payload: item,
    });
};

export const updateEquipment = (item: any) => (dispatch: any) => {
    dispatch({
        type: UPDATE_EQUIPMENT,
        payload: item,
    });
};

export const saveEquipment = (data: any) => (dispatch: any) => {
    dispatch({
        type: SAVE_EQUIPMENT_REQUEST,
        payload: data,
    });
    return _saveEquipment(data)
        .then(() => {
            return _getBookedServices().then((res) => {
                dispatch({ type: GET_BOOKED_SERVICES_SUCCESS, payload: res });
                dispatch({ type: SAVE_EQUIPMENT_SUCCESS });
                return null;
            });
        })
        .catch((error) =>
            dispatch({ type: SAVE_EQUIPMENT_ERROR, payload: error })
        );
};

export const saveBadge = (data: any) => (dispatch: any) => {
    dispatch({
        type: SAVE_BADGES_REQUEST,
        payload: data,
    });
    return _saveBadge(data)
        .then(() => {
            return _getBookedServices().then((res) => {
                dispatch({ type: GET_BOOKED_SERVICES_SUCCESS, payload: res });
                dispatch({ type: SAVE_BADGES_SUCCESS });
                return null;
            });
        })
        .catch((error) =>
            dispatch({ type: SAVE_BADGES_ERROR, payload: error })
        );
};

export const saveAutoPass = (data: any) => (dispatch: any) => {
    dispatch({
        type: SAVE_AUTO_PASSES_REQUEST,
        payload: data,
    });
    return _saveAutoPass(data)
        .then(() => {
            return _getBookedServices().then((res) => {
                dispatch({ type: GET_BOOKED_SERVICES_SUCCESS, payload: res });
                dispatch({ type: SAVE_AUTO_PASSES_SUCCESS });
                return null;
            });
        })
        .catch((error) =>
            dispatch({ type: SAVE_AUTO_PASSES_ERROR, payload: error })
        );
};

export const savePersonalPass = (data: any) => (dispatch: any) => {
    dispatch({
        type: SAVE_PERSONAL_PASSES_REQUEST,
        payload: data,
    });
    return _savePersonalPass(data)
        .then(() => {
            return _getBookedServices().then((res) => {
                dispatch({ type: GET_BOOKED_SERVICES_SUCCESS, payload: res });
                dispatch({ type: SAVE_PERSONAL_PASSES_SUCCESS });
                return null;
            });
        })
        .catch((error) =>
            dispatch({ type: SAVE_PERSONAL_PASSES_ERROR, payload: error })
        );
};

export const saveVIPParking = (data: any) => (dispatch: any) => {
    dispatch({
        type: SAVE_VIP_PARKING_REQUEST,
        payload: data,
    });
    return _saveVIPParking(data)
        .then(() => {
            return _getBookedServices().then((res) => {
                dispatch({ type: GET_BOOKED_SERVICES_SUCCESS, payload: res });
                dispatch({ type: SAVE_VIP_PARKING_SUCCESS });
                return null;
            });
        })
        .catch((error) =>
            dispatch({ type: SAVE_VIP_PARKING_ERROR, payload: error })
        );
};

export const getAdditionalServices = () => (dispatch: any) => {
    dispatch({
        type: GET_ADDITIONAL_SERVICES_REQUEST,
    });
    _getAdditionalServices()
        .then(({ data }: any) => {
            return dispatch({
                type: GET_ADDITIONAL_SERVICES_SUCCESS,
                payload: data,
            });
        })
        .catch((error: any) =>
            dispatch({ type: GET_ADDITIONAL_SERVICES_ERROR, payload: error })
        );
};

export const getBookedAdditionalServices = (data: any) => {
    return data.services.filter(
        ({ type }: any) => type === 'additionalServices'
    );
};

export const orderAdditionalService = (item: any) => (dispatch: any) => {
    dispatch({
        type: ORDER_ADDITIONAL_SERVICES,
        payload: item,
    });
};

export const resetBookedAdditionalServices = () => (dispatch: any) => {
    dispatch({
        type: RESET_BOOKED_ADDITIONAL_SERVICES,
    });
};

export const removeAdditionalService = (item: any) => (dispatch: any) => {
    if (item.id.startsWith('NEW_ORDER')) {
        dispatch({
            type: REMOVE_ADDITIONAL_SERVICES,
            payload: item,
        });
    } else {
        dispatch({
            type: UPDATE_ADDITIONAL_SERVICES,
            payload: { ...item, removed: true },
        });
    }
};

export const updateAdditionalService = (data: any) => (dispatch: any) => {
    const payload = { ...data };
    if (data.date && moment.isMoment(data.date)) {
        payload.date = data.date.format('YYYY-MM-DD');
    }
    dispatch({
        type: UPDATE_ADDITIONAL_SERVICES,
        payload,
    });
};

export const saveAdditionalServices = () => (dispatch: any, getState: any) => {
    dispatch({
        type: SAVE_ADDITIONAL_SERVICES_REQUEST,
    });
    const data = getState().bookedServices.additionalServices.booked.map(
        (item: any) =>
            item.id.startsWith('NEW_ORDER') ? { ...item, id: undefined } : item
    );
    return saveServices(data)
        .then(() => {
            return _getBookedServices().then((res) => {
                dispatch({ type: GET_BOOKED_SERVICES_SUCCESS, payload: res });
                dispatch({ type: SAVE_ADDITIONAL_SERVICES_SUCCESS });
                return null;
            });
        })
        .catch((error) =>
            dispatch({ type: SAVE_ADDITIONAL_SERVICES_ERROR, payload: error })
        );
};
