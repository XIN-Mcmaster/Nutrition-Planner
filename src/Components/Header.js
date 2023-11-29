import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

export function Header() {

  const { clearUserId, user } = useUser();

  const handleLogout = () => {
    clearUserId(); 
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">Nutrition Planner</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createPlan">Create Recipe</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myRecipe">My Recipe</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link>
            </li>
            <li className="nav-item">
            <span className="nav-link" >Signed in as : {user}</span>               
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

