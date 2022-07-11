const styleObj = {
    display:"flex",
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center",
    gap:"20%",
    marginTop:"auto"
}

function BottomBar() {
    return (
        <footer id = 'bottom-bar' style={styleObj}>
            <p>github</p>
            <p>linkedin</p>
        </footer>
    )
}

export default BottomBar