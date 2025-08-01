
const Profile = () => {
  const user = {
    name: 'Rupesh Badode',
    email: 'rupesh@example.com',
    phone: '+91 9876543210',
    bio: 'MERN Stack Developer | React Lover',
    image: 'https://via.placeholder.com/150',
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <img src={user.image} className="card-img-top" alt="Profile" />
            <div className="card-body">
              <h5 className="card-title text-center">{user.name}</h5>
              <p className="card-text">
                <strong>Email:</strong> {user.email}<br />
                <strong>Phone:</strong> {user.phone}<br />
                <strong>Bio:</strong> {user.bio}
              </p>
              <div className="d-grid">
                <button className="btn btn-primary">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
