
function checkDB(userUrl,...args) {
    return fetch(userUrl).then(resp=>resp.json()).then(userData=>{
            const filteredUsers = userData.filter(user=> {
            for (let arg of args) {
                for (let prop in arg) {
                    if (arg[prop]===user[prop]) {
                        return true;
                    }
                }
            }
            return false;

        })
        if (filteredUsers.length === 0) return false
        return filteredUsers
    })
}


export default checkDB