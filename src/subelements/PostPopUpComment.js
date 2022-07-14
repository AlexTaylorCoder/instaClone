import timeDiff from "../helperFunc/timeDiff";

function PostPopUpComment({username,profPic,comment="",timestamp=0}) {
    let displayDate
    
    if (timestamp) {
        displayDate = timeDiff(timestamp)

    }

    return (
        <>
        <div className="flex-grid-postPopup">
            <img className = "profile-picture fit-img" width="50px" height="50px" src={profPic}/>
            <p className="flex-grid-align-time"><b>{username}</b>{timestamp ? displayDate: ""}</p>
            <p>{comment}</p>
        </div>
        </>
        ) 
}

export default PostPopUpComment
