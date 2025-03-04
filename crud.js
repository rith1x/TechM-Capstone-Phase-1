async function getData(endpoint) {
    try {
        let res = await fetch(endpoint)
        let dat = await res.json()
        return dat
    } catch (e) {
        return null
    }
}

async function putData(endpoint, data) {
    try {
        let res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        return true
    } catch (e) {
        return false
    }
}