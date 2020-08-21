const axios = require('axios')
const cache = require('memory-cache')

const timeout = 20 * 1000; // 20 seconds
const cacheLimit = 1000000 * 1000; // 11 days

exports.getJSON = async (url) => {
    // retrive possible content from volatile memory
    const cachedResult = cache.get(url);
    if (cachedResult !== null) {
        return cachedResult
    } else {
        response = await axios.get(url, {timeout: timeout})
        // if there is an error
        if (response.status !== undefined && response.status !== 200) {
            throw response;
        } else {
            // if everything was good
            // cache the object in volatile memory
            // only if cacheLimit > 0
            response = response.data
            
            if (cacheLimit > 0) {
                cache.put(url, response, cacheLimit);
            }
        
            return response;
        }
    }
    
}