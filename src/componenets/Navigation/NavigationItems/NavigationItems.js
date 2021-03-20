import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.Module.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            link=""
            active>Burger Builder
        </NavigationItem>
        <NavigationItem
            link="">Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;