import axios from 'axios';
import * as FileSaver from 'file-saver';

import { getBase64, getCookie, setCookie } from '../utils';

const apiUrl = process.env.REACT_APP_API_URL;
const auth = {
    password: process.env.REACT_APP_API_PASSWORD as string,
    username: process.env.REACT_APP_API_USERNAME as string,
};

const axiosInstance = axios.create({
    baseURL: `${apiUrl}/`,
    auth,
});

export const authenticate = (username: string, password: string) => {
    return axiosInstance
        .post(`auth`, {
            password,
            username,
        })
        .then((response) => {
            const docId = response.data.id;
            storeDocId(docId);
            return docId;
        });
};

export const logout = () => {
    setCookie('docId');
};

export function isAuthenticated() {
    return !!getDocId();
}

function storeDocId(docId: string) {
    setCookie('docId', docId, 2);
}

export function getDocId() {
    return getCookie('docId');
}

export function getBookedServices() {
    return axiosInstance
        .get(`client-data?docId=${getDocId()}`)
        .then((response) => response.data);
}

export async function saveCatalogue(data: any) {
    const newData = { ...data };
    if (newData.logo) {
        delete newData.logo;
    }
    if (newData.logoVector) {
        delete newData.logoVector;
    }
    if (data.logo && Array.isArray(data.logo)) {
        newData.logo = {
            name: data.logo[0].name,
            file: await getBase64(data.logo[0]),
            type: data.logo[0].type,
        };
    }
    if (data.logoVector && Array.isArray(data.logoVector)) {
        newData.logoVector = {
            name: data.logoVector[0].name,
            file: await getBase64(data.logoVector[0]),
            type: data.logoVector[0].type,
        };
    }

    return axiosInstance.post('catalogue', {
        docId: getDocId(),
        data: newData,
    });
}

export function saveContractor(data: any) {
    return axiosInstance.post('contractor', {
        docId: getDocId(),
        data,
    });
}

export function download(link: string, filename?: string) {
    axiosInstance({
        url: link,
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
        FileSaver.saveAs(new Blob([response.data]), filename);
    });
}

export function saveElectricity(data: any) {
    return axiosInstance.post('electricity', {
        docId: getDocId(),
        data,
    });
}

export function getEquipment() {
    return axiosInstance.get(`equipment?docId=${getDocId()}`);
}

export function saveEquipment(data: any) {
    return axiosInstance.post('equipment', { docId: getDocId(), data });
}

export function saveBadge(data: any) {
    return axiosInstance.post('badges', { docId: getDocId(), data });
}

export function saveAutoPass(data: any) {
    return axiosInstance.post('autoPasses', { docId: getDocId(), data });
}

export function savePersonalPass(data: any) {
    return axiosInstance.post('personalPasses', { docId: getDocId(), data });
}

export function saveVIPParking(data: any) {
    return axiosInstance.post('vipParking', { docId: getDocId(), data });
}

export function saveServices(data: any) {
    return axiosInstance.post('services', { docId: getDocId(), data });
}

export function getAdditionalServices() {
    return axiosInstance.get(`services?docId=${getDocId()}`);
}
