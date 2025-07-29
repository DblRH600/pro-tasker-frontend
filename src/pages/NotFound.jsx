// this is the (custom) 404 error page

function NotFoundPage() {
  return (
    <div>
      <h1>404 Page Not Found</h1>

      <p className="my-4 text-lg">
        The page you are trying to access has either moved or no longer exist.
      </p>

      {/* <img 
      className="justify-self-center"
      src="https://media1.giphy.com/media/l1Et89dcKnVN1zdpC/giphy.gif" 
      alt="Not-able GIFs - Get the best GIF on GIPHY" /> */}

      <img 
      className="justify-self-center w-full h-75%"
      src="https://gifdb.com/images/thumbnail/cute-anime-chika-fujiwara-angry-3ff1u4fuj4xin91r.gif" 
      alt="Cute Anime GIFs | GIFDB.com" />
    </div>
  );
}

export default NotFoundPage;
