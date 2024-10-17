/* eslint-disable react/prop-types */
import React from "react";
import { category_list } from "../assets/assest";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card} from "react-bootstrap";


const CategorySection = () => {
  const navigate = useNavigate(); 
  const handleCategoryClick = (category) => {
   
    navigate(`/category-details/${category.title}`);
  };

  return (
    <Container id="categories" className="py-5">
      <h4 className="text-center mb-4">Explore All Categories</h4>
      <Row>
        {category_list.map((item, index) => (
          <Col xs={12} sm={6} md={4} key={index} className="mb-4">
            <Card
              className="h-100 card-custom"
              onClick={() => handleCategoryClick(item)} // Navigate on card click
            >
              <Card.Img variant="top" src={item.image} alt={item.title} 
              style={{height: "200px", objectFit:"cover"}}/>
              <Card.Body>
                <Card.Title className="text-dark">{item.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategorySection;

