import { Link } from "react-router-dom";
import React from 'react';
import { connect } from 'react-redux';
import {ItemList} from '../cmps/ItemList.jsx'
import {ShopPreview} from '../cmps/ShopPreview.jsx'
import { loadItems } from '../store/actions/itemActions'
//add shop preview

class ItemsPage extends React.Component {

    state = {
        sort:1,
        shop1:null,
        shop2:null
    }

    componentDidMount() {
        const filter ={searchValue : this.props.match.params.q} 
        var {sort} =this.state
        this.props.loadItems(filter,sort)
        // this.props.loadShops(filter)
    }

    onHandleChange=({target})=>{
        this.setState({[target.name]:target.value})
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadItems())
    }

    render() {
        return (!this.props.items) ? <p>Loading</p> : <section className="items-page">
            <form>
                <label>Sort by Price: 
                    <select name="sort" onChange={this.onHandleChange}>
                        <option value={1} >Low to High</option>
                        <option value={-1} >High to Low</option>
                    </select>
                </label>
                <label>Minimum Price: 
                    <input name="maxPrice" type="number"/>
                </label>
                <label>Maximum Price: 
                    <input name="minPrice" type="number"/>
                </label>
            </form>
            <ItemList items={this.props.items}/>
            <ShopPreview shop={this.state.shop1}/>
            <ShopPreview shop={this.state.shop2}/>
        </section>
    }
}

const mapStateToProps = state => {
    return {
        items: state.item.items,
        filter: state.item.filter
    };
};

const mapDispatchToProps = {
    loadItems
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);