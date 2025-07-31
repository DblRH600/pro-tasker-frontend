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
      src="https://media1.tenor.com/m/v5J1g-LvD4kAAAAC/cyclops-x-men-cyclops.gif" 
      alt="Cyclops X-men Krakoa GIF - Cyclops x-men Cyclops Krakoa - Discover ..." /> */}

      <img 
      className="justify-self-center w-full h-75%"
      src="https://th.bing.com/th/id/R.a6601d77ae74715e7ca6106f49a7134b?rik=mdTfI%2bybBYR3Vw&riu=http%3a%2f%2fwww.fightersgeneration.com%2fcharacters%2fcyc-opticblast-air.gif&ehk=osAdFYKWz%2bo15K451ScqU4Z2BNxTLXQM8YW%2fDxWkh7I%3d&risl=&pid=ImgRaw&r=0" 
      alt="Cyclops Gif Animations" />
    </div>
  );
}

export default NotFoundPage;
