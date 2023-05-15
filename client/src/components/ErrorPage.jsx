import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="err">
      <h2>Error 404:Page not found</h2>
      <div className="err-btns">
        <button onClick={() => navigate(-1)}>Go back</button>
        <button>
          <Link to="/">Go Home</Link>
        </button>
      </div>
    </div>
  );
}
