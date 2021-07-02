const axios = require('axios')

class ApiManager {
    constructor() {
        this.pHandler = promise => promise.then(data => {
            return data.data
        }).catch(error => null)
        this.sPath = "https://localhost:3200"
    }

    getMenu = async (resId) => {
        try {
            const menu = await axios.get(`http://localhost:3200/menu/${resId}`);
            // const menu = await axios.get(`${this.sPath}/menu/${resId}?isAdmin=${isAdmin}`);
            return menu.data
        } catch (error) {
            return error
        }
    }

    getRestaurants = async (page, hasFilter) => {
        try {
            const restaurants = await axios.get(`http://localhost:3200/restaurants/${page}/?hasMenu=${hasFilter}`);
            return restaurants.data
        } catch (error) {
            return error
        }
    }

    // getEditMenu = async (resId, isAdmin) => {
    //     try {
    //         const restaurants = await axios.get(`http://localhost:3200/menu/edit/${resId}/?isAdmin=${isAdmin}`);
    //         return restaurants.data
    //     } catch (error) {
    //         return error
    //     }
    // }

}

export default ApiManager