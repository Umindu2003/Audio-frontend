import"./productCard.css"

export default function ProductCard(props) {

    console.log(props);

  return (
    <div className="card">
      <img
        src={props.img}
      />
      <div className="card-content">
        <h2>{props.name}</h2>
        <span>{props.price}</span>
        <p>{props.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
