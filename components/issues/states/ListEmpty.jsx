function ListEmpty() {
  return (
    <main>
      <div className="container py-5 is-flex is-justify-content-center is-align-items-center">
        <div className="has-text-centered">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="92"
            width="92"
            className="has-text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="has-text-centered">
            <p className="is-size-4 has-text-weight-bold">Oops! Nothing to find here!</p>
            <p className="is-size-6">It&apos;s all empty down here.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ListEmpty;
