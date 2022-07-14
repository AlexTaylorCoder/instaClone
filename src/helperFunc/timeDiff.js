

function timeDiff(timestamp=0,fullText=false) {
         
    const currentDate = new Date()
    const postDate = new Date(timestamp)

    const differenceSec= Math.abs(currentDate-postDate) / 1000;
    
    const years = differenceSec/(3600 * 24 * 365)
    const days = differenceSec/(3600 * 24)
    const hours = differenceSec/(3600)
    const minutes = differenceSec / (60)

    if (Math.floor(years) > 0) {
        
        return Math.round(years) + (fullText ? " YEARS AGO" : "y")
    }
    else if (Math.floor(days) > 0) {
        return Math.round(days) + (fullText ? " DAYS AGO" : "d")

    }
    else if (Math.floor(hours) > 0) {
        return Math.round(hours) + (fullText ? " HOURS AGO" : "h")
    }
    else if (Math.floor(minutes) > 0) {
        return Math.round(minutes) + (fullText ? " MINUTES AGO" : "m")
    }
    else {
        return Math.round(differenceSec) + (fullText ? "SECOND AGO" : "s")
    }

    
}

export default timeDiff