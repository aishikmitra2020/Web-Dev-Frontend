import profilePic from './assets/profile.jpg'

function Card(){
    return(
        // In jsx, we need to use 'className' instead of 'class' (to set the 'class' of any html element, as class is a reserved keyword in JavaScript)
        <div className="card">
            <img className='card-image' src={profilePic} alt="profile pic" />
            <h2 className="card-title">Aishik Mitra</h2>
            <p className="card-text">Hey, I am studying ReactJS</p>
        </div>
    );
}

export default Card;