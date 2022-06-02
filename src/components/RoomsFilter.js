import React, { useContext } from 'react'
import { RoomContext } from '../context'
import Title from '../components/Title'

// get unique values from rooms
const getUnique = (items, value) => {
 return [...new Set(items.map(item => item[value]))];
}

const RoomsFilter = ({ rooms }) => {
 const context = useContext(RoomContext);
 const {
  handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets, sortRooms, sort
 } = context;
 // get unique types
 let types = getUnique(rooms, 'type');
 types = ['all', ...types];
 // map jsx
 types = types.map((item, index) => {
  return <option value={item} key={index}>{item}</option>
 })
 // get guests
 let people = getUnique(rooms, 'capacity').sort(function (a, b) { return a - b });
 people = people.map((item, index) => {
  return <option key={index} value={item}>{item}</option>
 })
 // sort jsx
 let sortOptions = ['Price (Lowest to Highest)', 'Price (Highest to Lowest)', 'Name (A - Z)', 'Name (Z - A)'];
 sortOptions = sortOptions.map((item, index) => {
  return <option key={index} value={item}>{item}</option>
 })
 return (
  <section className="filter-container">
   <Title title='search rooms' />
   <form className='filter-form'>
    {/* select type */}
    <div className="form-group">
     <label htmlFor="type">room type</label>
     <select name="type" id="type" value={type} className='form-control' onChange={handleChange}>
      {types}
     </select>
    </div>
    {/* end of select type */}
    {/* select guests */}
    <div className="form-group">
     <label htmlFor="capacity">guests</label>
     <select name="capacity" id="capacity" value={capacity} className='form-control' onChange={handleChange}>
      {people}
     </select>
    </div>
    {/* end of select guests */}
    {/* room price */}
    <div className="form-group">
     <label htmlFor="price">room price ${price}</label>
     <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control" />
    </div>
    {/* end room price */}
    {/* room size */}
    <div className="form-group">
     <label htmlFor="size">room size</label>
     <div className="size-inputs">
      <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className='size-input' />
      <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className='size-input' />
     </div>
    </div>
    {/* end room size */}
    {/* Extras */}
    <div className="form-group">
     <div className="single-extra">
      <input type='checkbox' name='breakfast' id='breakfast' checked={breakfast} onChange={handleChange} />
      <label htmlFor='breakfast'>breakfast</label>
     </div>
     <div className="single-extra">
      <input type='checkbox' name='pets' id='pets' checked={pets} onChange={handleChange} />
      <label htmlFor='pets'>pets</label>
     </div>
    </div>
    {/* end of extras */}
    {/* Sorting */}
    <div className="form-group">
     <label htmlFor="sort">Sort rooms</label>
     <select name="sort" id="sort" value={sort} className='form-control' onChange={sortRooms}>
      {sortOptions}
     </select>
    </div>
    {/* end of sorting */}
   </form>
  </section>
 )
}

export default RoomsFilter