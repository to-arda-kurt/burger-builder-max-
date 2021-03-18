import React from "react";
import classes from "./Layout.module.css";

const layout = (props) => (
  <>
    <p>Toolbar, SideDrawer, Backdrop</p>
    <main className={classes.Content}>{props.children}</main>
  </>
);

export default layout;
