

function progLang(props){

    const styles={
        backgroundColor: props.color
    }

    return <>
        <span className={props.className} style={styles}>
            <p>{props.text}</p>
        </span>
    </>
}
export default progLang