import PropTypes from "prop-types";

function List2(props){
    const category = props.category;
    const itemList = props.items;

    const listItems = itemList.map(item => (
        <li key={item.id}>{item.name} : <b>{item.calories}</b></li>
    ))

    // return(
    //     <ul>
    //         {listItems}
    //     </ul>
    // );

    // return(listItems);

    // Directly inside the return statement, we can write JS code directly. But inside the fragment <></> or any html tag we have to use {} curly braces to write JS
    return(
        <>
            <h3 className="list-category" style={{"textAlign":"center"}}>{category}</h3>
            <ol className="list-items">
                {listItems}
            </ol>
        </>
    );
}

List2.propTypes = {
    category: PropTypes.string,
    // 'PropTypes.arrayOf' says that the items field will be array of something whose shape or stucture is defined by 'PropTypes.shape'. 
    items: PropTypes.arrayOf(PropTypes.shape({id: PropTypes.number,
                                            name: PropTypes.string,
                                            calories: PropTypes.number})),
}

List2.defaultProps = {
    category: "Category",
    items: [],
}

export default List2