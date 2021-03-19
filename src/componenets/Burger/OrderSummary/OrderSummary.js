const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingName, i) => (
    <p key={ingName + i}>
      {ingName} : {props.ingredients[ingName]}
    </p>
  ));
  return (
    <>
      <h2>Order Summary</h2>
      {ingredientSummary}
      <p>Total Price: £{props.price}</p>
    </>
  );
};

export default orderSummary;
