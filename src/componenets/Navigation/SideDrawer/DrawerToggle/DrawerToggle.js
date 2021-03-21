import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.drawerClicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;
