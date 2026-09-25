# useRef Hook
- doesn't trigger re-render
- similar to dom selectors
- it lets us to reference a value that is not needed for renering.
- unlike states, it's directly mutable
- we can access its value using yourRef.current;
- uncontrolled components

## ForwardRef
- before Reactv19
- parents to child data transfer
- without porps
- without re-rendering
- in uncontrolled way