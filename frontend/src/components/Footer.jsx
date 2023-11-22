const Footer = () => {
  return (
    <footer className="bg-black text-white p-8 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Blog Market. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
