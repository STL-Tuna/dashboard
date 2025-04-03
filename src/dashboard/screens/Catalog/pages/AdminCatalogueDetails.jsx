import React from "react";
import { useParams } from "react-router";
import { useCatalogueDetails } from "../../../../hooks/useCatalogue";
import { Container } from "react-bootstrap";

export const AdminCatalogueDetail = () => {
  const { id } = useParams();
  const { details, loading, error } = useCatalogueDetails(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
    <h2>Catalog Viewer</h2>
    <div style={{
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
      overflow: 'hidden'
    }}>
      <iframe
  src={`https://docs.google.com/viewer?url=${encodeURIComponent(
    details.image_url
  )}&embedded=true&a=pid`}
  width="100%"
  height="600px"
  style={{ border: "none" }}
></iframe>
      {/* <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(
          details.image_url
        )}&embedded=true`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        allowFullScreen
      ></iframe> */}
    </div>
  </Container>
  );
};
