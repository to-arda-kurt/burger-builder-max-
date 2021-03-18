import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p><strong>Price: £{props.price.toFixed(2)}</strong></p>
    {controls.map((ctrl) => {
      return (
        <BuildControl
          added={() => props.ingredientsAdded(ctrl.type)}
          remove={() => props.ingredientsRemove(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
          key={ctrl.label}
          label={ctrl.label}
        />
      );
    })}
    <button
        disabled={!props.purchasable}
        className={classes.OrderButton}>Checkout</button>
  </div>
);

export default buildControls;
