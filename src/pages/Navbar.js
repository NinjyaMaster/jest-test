import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to={`/welcome`} aria-label="welcome">
            Welcome
          </Link>
        </li>
        <li>
          <Link to={`/`} aria-label="login">
            LoginText
          </Link>
        </li>
        <li>
          <Link to={`/sample`} aria-label="sample">
            Sample
          </Link>
        </li>
        <li>
          <Link to={`/useparam/5`} aria-label="useparam">
            Use Param Test
          </Link>
        </li>
      </ul>
    </div>
  );
}
