

function gameStatus(props){
    return <>
        <div className={props.className}>
            <h2>{props.heading}</h2>
            <p>{props.message}</p>
        </div>
    
    </>
}
export default gameStatus;