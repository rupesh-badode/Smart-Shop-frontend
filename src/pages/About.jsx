
export default function About(){
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">
        <i className="bi bi-info-circle-fill me-2"></i>About Smart Shop
      </h1>

      {/* Overview */}
      <section className="mb-5">
        <h4><i className="bi bi-bag-fill me-2"></i>What is Smart Shop?</h4>
        <p>
          Smart Shop is a modern e-commerce platform where users can browse products, manage a cart, and complete secure purchases.
          It supports user login, registration, and a seamless shopping experience across devices.
        </p>
      </section>

      {/* How to Use */}
      <section className="mb-5">
        <h4><i className="bi bi-gear-fill me-2"></i>How to Use Smart Shop</h4>

        <div className="mb-3">
          <h6><i className="bi bi-person-fill me-2"></i>1. Login / Signup</h6>
          <ul>
            <li>Click <strong>Login</strong> on the navbar.</li>
            <li>New users can register using name, email, and password.</li>
            <li>Logged-in users will see their profile and can access cart/checkout features.</li>
          </ul>
        </div>

        <div className="mb-3">
          <h6><i className="bi bi-search me-2"></i>2. Browsing Products</h6>
          <ul>
            <li>Use the search bar or filter by category and price range.</li>
            <li>Each product card has image, title, price, and action buttons.</li>
          </ul>
        </div>

        <div className="mb-3">
          <h6><i className="bi bi-cart-plus-fill me-2"></i>3. Add to Cart</h6>
          <ul>
            <li>Click the <strong>Add to Cart</strong> button to add a product.</li>
            <li>Access your cart from the navbar at any time.</li>
          </ul>
        </div>

        <div className="mb-3">
          <h6><i className="bi bi-credit-card-2-back-fill me-2"></i>4. Buying / Checkout</h6>
          <ul>
            <li>Click <strong>Checkout</strong> to begin the purchase process.</li>
            <li>Payment is securely handled by <strong>Razorpay</strong> (supports UPI & cards).</li>
          </ul>
        </div>
      </section>

      {/* Technologies */}
      <section className="mb-5">
        <h4><i className="bi bi-cpu-fill me-2"></i>Technologies Used</h4>
        <div className="row">
          <div className="col-md-6">
            <h6><i className="bi bi-window me-2"></i>Frontend</h6>
            <ul>
              <li>React.js, React Router</li>
              <li>Bootstrap 5, Bootstrap Icons</li>
              <li>Framer Motion, AOS</li>
              <li>Axios (API calls)</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h6><i className="bi bi-server me-2"></i>Backend</h6>
            <ul>
              <li>Node.js, Express.js</li>
              <li>MongoDB Atlas with Mongoose</li>
              <li>Firebase Authentication</li>
              <li>Razorpay Integration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="mb-5">
        <h4><i className="bi bi-diagram-3-fill me-2"></i>User Flow</h4>
        <p>
          <strong>Visit Website → Browse Products → Add to Cart → Login/Signup → Checkout → Payment → Success</strong>
        </p>
      </section>

      {/* Footer Note */}
      <section>
        <h5 className="text-center text-success">
          <i className="bi bi-heart-fill me-2"></i>Thank you for visiting Smart Shop!
        </h5>
      </section>
    </div>
  );
};

