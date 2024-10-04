import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../redux/slices/categorySlice';
import {mockCateg} from '../../assets/assest'

const CategoryDetails = () => {

  const dispatch = useDispatch();
  const category = useSelector(state => state.category);

  useEffect(() => {
   dispatch(setCategory(mockCateg));
  },[])



  return (
    <div className="category">
      <h2> category name</h2>
      <div>
        {category.categories.map((category, index) => (
          <div key={index}>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails
;