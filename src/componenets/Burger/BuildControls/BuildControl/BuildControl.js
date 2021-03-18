import classes from "./BuildControl.module.css";

const buildControl = (props) => (
    <div className={classes.BuildControl}>

        <div className={classes.Label}>{props.label}</div>
        <button
            onClick={props.remove}
            className={classes.Less}
            disabled={props.disabled}>
            -
        </button>
        <button
            onClick={props.added}
            className={classes.More}>
            +
        </button>
    </div>
);

export default buildControl;
