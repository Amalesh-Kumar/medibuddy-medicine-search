import { Link } from "react-router-dom";

function getValue(value) {
  if (!value || value.length === 0) {
    return "Not available";
  }

  return value.join(", ");
}

function MedicineCard({ medicine }) {
  const openfda = medicine.openfda || {};

  const brandName = getValue(openfda.brand_name);
  const genericName = getValue(openfda.generic_name);
  const manufacturer = getValue(openfda.manufacturer_name);
  const productType = getValue(openfda.product_type);
  const route = getValue(openfda.route);

  return (
    <Link
      to={`/medicine/${encodeURIComponent(medicine.id)}`}
      state={{ medicine }}
      className="medicine-card"
    >
      <h2>{brandName}</h2>

      <p>
        <strong>Generic:</strong> {genericName}
      </p>

      <p>
        <strong>Manufacturer:</strong> {manufacturer}
      </p>

      <p>
        <strong>Product Type:</strong> {productType}
      </p>

      <p>
        <strong>Route:</strong> {route}
      </p>
    </Link>
  );
}

export default MedicineCard;