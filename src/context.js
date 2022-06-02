import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext();

class RoomProvider extends Component {
 state = {
  rooms: [],
  sortedRooms: [],
  featuredRooms: [],
  loading: true,
  type: 'all',
  capacity: 1,
  price: 0,
  minPrice: 0,
  maxPrice: 0,
  minSize: 0,
  maxSize: 0,
  breakfast: false,
  pets: false,
  sort: 'Price (Lowest to Highest)'
 }

 componentDidMount() {
  let rooms = this.formatData(items);
  let featuredRooms = rooms.filter(room => room.featured === true);
  let maxPrice = Math.max(...rooms.map(item => item.price));
  let maxSize = Math.max(...rooms.map(item => item.size));
  this.setState({
   rooms,
   featuredRooms,
   sortedRooms: rooms,
   loading: false,
   maxPrice: maxPrice,
   maxSize: maxSize
  })
 }

 formatData(items) {
  let tempItems = items.map(item => {
   let id = item.sys.id;
   let images = item.fields.images.map(image => image.fields.file.url);
   let room = { ...item.fields, images, id }
   return room;
  })
  return tempItems;
 }

 getRoom = (slug) => {
  let tempRooms = [...this.state.rooms];
  const room = tempRooms.find(room => room.slug === slug);
  return room;
 }

 handleChange = event => {
  const target = event.target
  const value = target.type === 'checkbox' ? target.checked : target.value
  const name = event.target.name
  this.setState({
   [name]: value
  }, this.filterRooms)
 }

 filterRooms = () => {
  let {
   rooms, type, capacity, price, minSize, maxSize, breakfast, pets
  } = this.state;
  // all the rooms
  let tempRooms = [...rooms];
  // transform values
  capacity = parseInt(capacity);
  price = parseInt(price);
  // Filter by type
  if (type !== 'all') {
   tempRooms = tempRooms.filter(room => room.type === type)
  }
  // filter by capacity
  if (capacity !== 1) {
   tempRooms = tempRooms.filter(room => room.capacity >= capacity)
  }
  // filter by price
  tempRooms = tempRooms.filter(room => room.price >= price)

  // filter by size
  tempRooms = tempRooms.filter(room => room.size > minSize && room.size < maxSize)
  //filter by breakfast
  if (breakfast) {
   tempRooms = tempRooms.filter(room => room.breakfast === true)
  }
  //filter by pets
  if (pets) {
   tempRooms = tempRooms.filter(room => room.pets === true)
  }
  //change state
  this.setState({
   sortedRooms: tempRooms
  })
 }

 sortRooms = (e) => {
  const val = e.target.value;
  if (val === 'Price (Highest to Lowest)') {
   let sorted = this.state.sortedRooms.sort(function (a, b) { return b.price - a.price });
   this.setState({
    sortedRooms: sorted
   });
  } else if (val === 'Price (Lowest to Highest)') {
   let sorted = this.state.sortedRooms.sort(function (a, b) { return a.price - b.price });
   this.setState({
    sortedRooms: sorted
   })
  } else if (val === 'Name (Z - A)') {
   let sorted = this.state.sortedRooms.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
   this.setState({
    sortedRooms: sorted
   });
  } else if (val === 'Name (A - Z)') {
   let sorted = this.state.sortedRooms.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
   this.setState({
    sortedRooms: sorted
   });
  }
  this.setState({
   sort: val
  })
 }

 render() {
  return (
   <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange, filterRooms: this.filterRooms, sortRooms: this.sortRooms }}>
    {this.props.children}
   </RoomContext.Provider>
  )
 }
}

const RoomConsumer = RoomContext.Consumer;
export { RoomProvider, RoomConsumer, RoomContext };