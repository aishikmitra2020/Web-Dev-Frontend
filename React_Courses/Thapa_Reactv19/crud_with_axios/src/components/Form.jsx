import React, { useEffect, useState } from 'react'
import { postData, updateData } from '../api/PostAPI';

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {

    const [addData, setAddData] = useState({
        title: "",
        body: ""
    });

    // checks that the onject is empty or not. 'Object.keys(updateDataApi)' returns all the keys of the object in form of list
    let isEmpty = Object.keys(updateDataApi).length === 0;

    // get the updated data and add into input field
    useEffect(() => {
        // it checks the existence of updateDataApi. checks if it truthy
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || ""
        })
    }, [updateDataApi])

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        // console.log(e.target)

        setAddData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // add post data
    const addPostData = async () => {
        try {
            const res = await postData(addData);
            console.log(res);

            if(res.status === 201) {
                setData([...data, res.data]);
                setAddData({ title: "", body: '' })
            } else {
                console.log("Failed to add data: ", res.status);
            }
        } catch (err) {
            console.log(err)
        }
    }

    // update post data
    const updatePostData = async () => {
        try {
            const res = await updateData(updateDataApi.id, addData);
            console.log(res);

            if (res.status === 200) {
                // updating the data in the state variable
                // const updatedPosts = data.map((currElem) => {
                //     if (currElem.id === updateDataApi.id) {
                //         return res.data;
                //     } else {
                //         return currElem;
                //     }
                // })
                // setData(updatedPosts);

                // another way to update the data
                setData((prev) => {
                    return prev.map((currElem) => {
                        return currElem.id === res.data.id ? res.data : currElem
                    })
                })

                setAddData({ title: "", body: "" });
                setUpdateDataApi({});
            } else {
                console.log("Failed to update data: ", res.status);
            }
        } catch(err) {
            console.log(err);
        }
    }

    // form submission
    const handleFormSubmit = (e) => {
        e.preventDefault(); // prevent page reload

        const action = e.nativeEvent.submitter.value; // gethe the value of 'value' property of the sumbit button

        if (action === "Add"){
            addPostData(addData);
        } else if (action === "Edit") {
            updatePostData();
        } else {
            console.log("An error occurred")
        }
        
    }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" name='title' placeholder='Add Title' value={addData.title} onChange={handleInputChange} />

      <input type="text" name='body' placeholder='Add Body' value={addData.body} onChange={handleInputChange} />

      <button type='submit' value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
    </form>
  )
}

export default Form
