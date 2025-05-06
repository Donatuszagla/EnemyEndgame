



function key(props){
    return <>
        <button className={props.className} onClick={props.onClick} disabled={props.isGameOver}>{props.value}</button>
    </>
}
export default key