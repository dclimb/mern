import React from "react";
// import PropTypes from 'prop-types'

const Footer = props => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} MERN App
    </footer>
  );
};

export default Footer;
