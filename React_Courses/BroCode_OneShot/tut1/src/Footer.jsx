function Footer() {
  return(
    // But here we can write JS directly. Becuse this is directly inside the return statement.
    // If we enclose our code under fragment (<></>) or any html tag then we need to use {} (curly braces) for writing JS
    <footer>
        {/* To add JS code inside this(inside any component) we need {} to write the js code */}
        <p>BroCode OneShot &copy; {new Date().getFullYear()}</p>
        <p>All rights reserved.</p>
    </footer>
  );
}

export default Footer;