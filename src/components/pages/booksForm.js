"use strict"
import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {findDOMNode} from 'react-dom';

import {postBooks, deleteBooks, getBooks} from '../../actions/booksActions';
import axios from 'axios';

class BooksForm extends React.Component{
  constructor(props){
  	super(props);
  	this.state = {
      images: [{}],
      img: ''
    };
  }
  componentDidMount() {
    this.props.getBooks();
    //GET IMAGES FROM API
    axios.get('/api/images')
      .then(function(response) {
        this.setState({images: response.data})
      }.bind(this))
      .catch(function(err) {
        this.setState({images: 'error loading image files from server', img: ''})
      }.bind(this))
  }
	handleSubmit(){
		const book = [
			{
				title: 			  findDOMNode(this.refs.title).value,
				description: 	findDOMNode(this.refs.description).value,
        images:       findDOMNode(this.refs.image).value,
				price: 			  findDOMNode(this.refs.price).value

			}
		]
		this.props.postBooks(book);
	}


	onDelete(){
		let bookId = findDOMNode(this.refs.delete).value;
		this.props.deleteBooks(bookId);
	}

  handelSelect(img){
    this.setState({
      img: '/images/' + img
    })
  }

	render(){
		const booksList = this.props.books.map(function(bookArr){
			return (
				<option key={bookArr._id} > {bookArr._id} </option>
			)
		});

    const imgList = this.state.images.map(function(imgArr, i){
      return(
        <MenuItem key={i}
        eventkey={imgArr.name}
        onClick={this.handelSelect.bind(this, imgArr.name )}
        >
          {imgArr.name}
        </MenuItem>
      )
    }, this);

		return(
			<Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type='text' ref='image' value={this.state.img}/>
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id='input-dropdown-addon'
                  title='Select an Image'
                  bsStyle='primary'
                >
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive/>
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel>
            <FormGroup controlId='title'>
            <ControlLabel> Title </ControlLabel>
            <FormControl
            type='text'
            placeholder='Enter Title'
            ref='title' />

            </FormGroup>

            <FormGroup controlId='description'>
            <ControlLabel> Description </ControlLabel>
            <FormControl
            type='text'
            placeholder='Enter Description'
            ref='description' />

            </FormGroup>

            <FormGroup controlId='price'>
            <ControlLabel> Price </ControlLabel>
            <FormControl
            type='text'
            placeholder='Enter price'
            ref='price' />

            </FormGroup>

            <Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'> Save Book </Button>
            </Panel>
            <Panel style={{marginTop: '25px'}}>
            <FormGroup controlId='formControlsSelect'>
            <ControlLabel>Select a book id to delete</ControlLabel>
            <FormControl ref='delete' componentClass='select' placeholder='select'>
            <option value='select'> Select </option>
            {booksList}
            </FormControl>
            </FormGroup>
            <Button bsStyle='danger' onClick={this.onDelete.bind(this)}> Delete</Button>
            </Panel>
          </Col>
        </Row>
			</Well>
		)
	}
}
function mapStateToProps(state) {
	return {
		books: state.books.books
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({postBooks, deleteBooks, getBooks}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
