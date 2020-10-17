import React from "react";
import { Link } from "react-router-dom";

const NoHomeLocation: React.FC = () => (
  <>
    Set your home location <Link to="/settings">Settings</Link>
  </>
);

export default NoHomeLocation;
