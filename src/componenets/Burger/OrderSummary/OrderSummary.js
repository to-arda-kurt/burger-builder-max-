const orderSummary = (props) => {
  const ingSum = props.ingredients;

  const ingredientSummary = Object.keys(ingSum).map((ingName, i) => (
    <li style={{ textTransform: "capitalize" }} key={ingName + i}>
      {ingName} : {props.ingredients[ingName]}
    </li>
  ));
  return (
    <>
      <h2>Order Summary</h2>
      <p>Your Order with following ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>Total Price: £{props.price.toFixed(2)}</p>
      <p>Checkout?</p>
    </>
  );
};

export default orderSummary;
