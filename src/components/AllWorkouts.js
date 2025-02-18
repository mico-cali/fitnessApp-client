import { useNavigate } from "react-router-dom";
// import perfumeImage from '../images/perfume.png';

export default function GetAllWorkouts({ workouts = [], searchConfirmed }) {
  const navigate = useNavigate();

  return (
    <div className="container-fluid py-3">
      <h2 className="text-center mb-4" style={{ marginTop: "30px" }}>
        {searchConfirmed ? "Search Results" : "My Workouts"}
      </h2>

      <div className="card-deck d-flex flex-wrap justify-content-center">
        {Array.isArray(workouts) && workouts.length > 0 ? (
          workouts.map((workout) => (
            <div
              className="card m-2 shadow-sm border-0"
              style={{
                width: "18rem",
                borderRadius: "10px",
                transition: "transform 0.3s ease-in-out",
              }}
              key={workout._id}
              // when you click anywhere inside the card
              onClick={() => navigate(`/workouts/${workout._id}`)}
              // animation for mouse cursor
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {/*<img
                src={perfumeImage}
                className="img-fluid rounded-top"
                alt={workout.name}
                style={{ height: "200px", objectFit: "cover" }}
              />*/}
              <div className="card-body text-center">
                <h5 className="card-title font-weight-bold text-dark">{workout.name}</h5>
                <p className="card-text text-muted">{workout.duration}</p>
                {/*<h4 className="text-warning font-weight-bold">P{workout.price}</h4>*/}
              </div>
              <div className="card-footer bg-white border-0 text-center">
                <button
                  className="btn btn-primary px-4"
                  onClick={() => navigate(`/workouts/${workout._id}`)}
                >
                  Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No workout available.</p>
        )}
      </div>
    </div>
  );
}
