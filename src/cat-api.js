import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_yeLHCcXmuP9kqqC64tVdEhLpvik7Qvl4IMNm9wAxFMPZBVB4GKRudaHKd32nGqfi";
const BASE_URL = 'https://api.thecatapi.com/v1/';

export async function fetchBreeds() {
    try {
        const response = await axios.get(`${BASE_URL}breeds`);
        
        if (!response.data) {
            throw new Error("No data returned");
        }

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchCatByBreed(breedId) {
    try {
        const response = await axios.get(`${BASE_URL}images/search`, {
            params: { 'breed_ids': breedId }
        });

        if (!response.data) {
            throw new Error("No data returned");
        }

        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function fetchCatByBreedId(id) {
    try {
        const response = await axios.get(`${BASE_URL}images/${id}`);

        if (!response.data) {
            throw new Error("No data returned");
        }

        return response.data;
    } catch (error) {
        throw error;
    }
}
