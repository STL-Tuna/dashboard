import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
// import { GoogleAnalyticsEmbed } from "./GoogleAnalyticsEmbed"; 

export const AdminHome = () => {
  // Sample data (replace with real data from an API)
  const stats = {
    totalBlogs: 120,
    totalUsers: 500,
    totalComments: 1200,
  };

  return (
    <div>
      {/* Welcome Message */}
      <h1>Welcome, Admin!</h1>
      <p className="text-muted">Here's an overview of your website.</p>

      {/* Quick Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Blog Posts</Card.Title>
              <Card.Text className="display-5">{stats.totalBlogs}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-5">{stats.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Comments</Card.Title>
              <Card.Text className="display-5">{stats.totalComments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Google Analytics Embed */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Website Traffic</Card.Title>
              {/* <GoogleAnalyticsEmbed /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <Button variant="primary" className="me-2">
                Add New Blog Post
              </Button>
              <Button variant="secondary" className="me-2">
                Manage Users
              </Button>
              <Button variant="info">View Recent Comments</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Recent Activity</Card.Title>
              <ul>
                <li>New blog post published: "Introduction to React"</li>
                <li>New user registered: John Doe</li>
                <li>New comment on blog post: "Great article!"</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};