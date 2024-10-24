import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card} from "react-bootstrap";
import axios from "axios";
const CategorySection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      const fetchedImages = response.data.images;
        console.log("Fetched images type:", Array.isArray(fetchedImages));

      console.log(response);

      const category_list = [
        { title: "Cookie", image: fetchedImages.cookie },
        { title: "Egg", image: fetchedImages.egg },
        { title: "Meat", image: fetchedImages.meat },
        { title: "Veggie", image: fetchedImages.veggie },
        { title: "Salted", image: fetchedImages.salted },
      ];

      setCategories(category_list);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category-details/${category.title}`);
  };
  return (
    <Container id="categories" className="py-5">
      <h4 className="text-center mb-4">Explore All Categories</h4>
      <Row>
        {categories.map((item, index) => (
          <Col xs={12} sm={6} md={4} key={index} className="mb-4">
            <Card
              className="h-100 card-custom"
              onClick={() => handleCategoryClick(item)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.title}
                style={{ height: "200px", objectFit: "cover" }}
              />

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
