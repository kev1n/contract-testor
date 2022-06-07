export default function Query(props) {
    const handleChange = (e) => {
        props.onQueryChange([props.index, e.target.value])
    }
    return (
        <>
            <div>
                <p>{props.name} ({props.type})</p>
                <input onChange = {handleChange}></input>
            </div>
        </>
    )
}