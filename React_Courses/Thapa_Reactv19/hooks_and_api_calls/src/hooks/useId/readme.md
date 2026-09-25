# useId()
- react hook for <b>generating unique IDs</b>, that can be passes to accessibility attributes
- (ensure that each instance of a component gets a unique ID which is useful for associating labels with input fields and other elements)
```js
const id = useId()
```
- <b>Parameters</b>: It does not take any parameters
- <b>Returns</b>: It returns unique id string associated with this particular useId call in this particular component

<b><u>Note: </u></b>useId should not be used to generate keys in list

- concept of htmlFor='' and id=''
- htmlFor=> jsx. for=>html

<b><u>This lets you avoid calling useId for every single element that needs a unique ID.:</u></b>
```js
const tut1 = () => {
  const id = useId();

  return (
    <form>
      <div>
        <label htmlFor={id + "username"}>username</label>
        <input type="text" id={id + "username"} name="username" />
      </div>
      <div>
        <label htmlFor={id + "email"}>email</label>
        <input type="email" id={id + "email"} name="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
```