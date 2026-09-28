import React from 'react'
import { Form, useActionData } from 'react-router-dom'

export const contactData = async ({ request }) => {
  try {
    const res = await request.formData();
    
    const data = Object.fromEntries(res); // get the data in readable format (object)
    console.log(data)

    // return null;

    return data;

  } catch(err) {
    console.log(err)
    return { error: "Something went wrong" };
  }
}

const Contact = () => {
  // Grab the returned data using useActionData
  const formData = useActionData();

  return (
    <>
    <Form method='POST' action='/contact'>
      <input type="text" name='name' required placeholder='Name' />
      <input type="email" name='email' required autoComplete='off' placeholder='abc@thapa.com' />
      <textarea name="message" cols="30" rows="10" placeholder='We are always herte to help you'></textarea>
      <button type='submit'>Submit</button>
    </Form>


    {/* 3. Conditional rendering to display the data once submitted */}
    <div>
      {formData && !formData.error && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Submitted Data:</h3>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Message:</strong> {formData.message}</p>
        </div>
      )}
    </div>

    </>
  )
}

export default Contact
