import Head from "next/head";

export default function Issues() {
  return (
    <div>
      <Head>
        <title>Issues Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="navbar has-background-dark has-text-white">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item brand-text" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="has-text-white">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </a>
            <div className="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="admin.html">
                Home
              </a>
              <a className="navbar-item" href="admin.html">
                Orders
              </a>
              <a className="navbar-item" href="admin.html">
                Payments
              </a>
              <a className="navbar-item" href="admin.html">
                Exceptions
              </a>
              <a className="navbar-item" href="admin.html">
                Reports
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>Hello</main>
    </div>
  );
}
