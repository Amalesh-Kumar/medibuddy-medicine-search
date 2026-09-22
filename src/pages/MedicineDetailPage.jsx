import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getMedicineById } from "../services/fdaApi";

function getValue(value) {
  if (!value || value.length === 0) {
    return "Not available";
  }

  return value.join(", ");
}

function MedicineDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  const [medicine, setMedicine] = useState(
    location.state?.medicine || null
  );

  const [loading, setLoading] = useState(!location.state?.medicine);
  const [error, setError] = useState("");

  useEffect(() => {
    if (medicine) {
      return;
    }

    const controller = new AbortController();

    async function loadMedicine() {
      try {
        setLoading(true);

        const result = await getMedicineById(
          decodeURIComponent(id),
          controller.signal
        );

        setMedicine(result);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        setError("Unable to load medicine details.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadMedicine();

    return () => {
      controller.abort();
    };
  }, [id, medicine]);

  if (loading) {
    return <div className="status">Loading medicine...</div>;
  }

  if (error) {
    return (
      <main className="container">
        <div className="status error">{error}</div>
        <Link to="/">Back to search</Link>
      </main>
    );
  }

  if (!medicine) {
    return (
      <main className="container">
        <div className="status">Medicine not found.</div>
        <Link to="/">Back to search</Link>
      </main>
    );
  }

  const openfda = medicine.openfda || {};

  return (
    <main className="container">
      <Link to="/" className="back-link">
        ← Back to search
      </Link>

      <article className="detail-card">
        <h1>{getValue(openfda.brand_name)}</h1>

        <div className="detail-row">
          <strong>Generic Name</strong>
          <span>{getValue(openfda.generic_name)}</span>
        </div>

        <div className="detail-row">
          <strong>Manufacturer</strong>
          <span>{getValue(openfda.manufacturer_name)}</span>
        </div>

        <div className="detail-row">
          <strong>Product Type</strong>
          <span>{getValue(openfda.product_type)}</span>
        </div>

        <div className="detail-row">
          <strong>Route</strong>
          <span>{getValue(openfda.route)}</span>
        </div>

        <div className="detail-row">
          <strong>Application Number</strong>
          <span>{getValue(openfda.application_number)}</span>
        </div>

        <div className="detail-row">
          <strong>Substance Name</strong>
          <span>{getValue(openfda.substance_name)}</span>
        </div>
      </article>
    </main>
  );
}

export default MedicineDetailPage;