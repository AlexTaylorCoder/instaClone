//See if all args match
// Need to speed up algorithm if possible
// currently O(n * args) complexity 

function checkDB(userUrl,args) {
    const objLength = Object.keys(args).length 
    return fetch(userUrl).then(resp=>resp.json()).then(userData=>{
            const filteredUsers = userData.filter(user=> {
                let count = 0
                for (let prop in args) {
                    if (args[prop] === user[prop]) {
                        count += 1
                    }
                }
                return count === objLength
        })
        if (filteredUsers.length === 0) return false
        return filteredUsers[0]
    })
}


export default checkDB