

function PostPopUpComment({username,profPic,comment="",timestamp=""}) {

    let displayDate

    if (timestamp) {
        
        const currentDate = new Date()
        const postDate = new Date(timestamp)

        const differenceSec= Math.abs(currentDate-postDate) / 1000;
        
        const years = differenceSec/(3600 * 24 * 365)
        const days = differenceSec/(3600 * 24)
        const hours = differenceSec/(3600)
        const minutes = differenceSec / (60)

        if (Math.floor(years) > 0) {
            
            displayDate = Math.round(years) + "y"
        }
        else if (Math.floor(days) > 0) {
            displayDate = Math.round(days) + "d"

        }
        else if (Math.floor(hours) > 0) {
            displayDate = Math.round(hours) + "h"
        }
        else if (Math.floor(minutes) > 0) {
            displayDate = Math.round(minutes) + "m"
        }
        else {
            displayDate = Math.round(differenceSec) + "s"
        }

        



    }

    return (
        <>
        <div className="flex-grid-postPopup">
            <img className = "profile-picture" width="50px" height="50px" src={profPic}/>
            <p className="flex-grid-align-time"><b>{username}</b>{timestamp ? displayDate: ""}</p>
            <p>{comment}</p>
        </div>
        </>
        ) 
}

export default PostPopUpComment
