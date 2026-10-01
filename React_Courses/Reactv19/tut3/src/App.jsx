// Video 14 - 21

// We may or may not write the extension while importing a '.jsx' and '.js' file, but while we are importing other files rather than .jsx and .js files, writing their file extension is mandatory
import NetflixSeries from "./components/NetflixSeries";
import Profile from "./components/Profile";
// import "./components/Netflix.css"

function App() {

  return (
    <>
    {/* We don't have loops (for loops, while loops, do while loops) in JSX. So, we have to use 'map()' method to loop over an array in JSX */}

    <section className="container">
      <h1 className="card-heading">List of Best Netflix Series</h1>
      <NetflixSeries />
    </section>

    {/* <Profile /> */}
    </>
  );
};

export default App
