import React, { Component, createRef, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router';
import { findToken, instance } from '../../axios';
import * as userActions from '../../redux/actions/user';
import ProductList from '../../components/Product/ProductList/ProductList';
import PageFallback from '../../ErrorBoundary/PageErrors/PageFallback';
import withAuth from '../../hoc/withAuth'
import './Products.css';
import { connect } from 'react-redux';
import RegSpinner from '../../components/RegisterSpinner/RegSpinner';
import ProductFilter from '../../components/Product/ProductFilter/ProductFilter';

import { toast } from 'react-toastify';

let success = (msg) => toast.success(msg,{
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })

    let error = (err) => toast.error(err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
class Products extends Component {
    priceInput = createRef();

    state = {
       listStyle:'low_to_expensive',
        foods:null,
        currentPage:1,
        nextExists:true,
        price:200,
        prodName:'',
        isEmpty:false,
        isClicked:false
    }

    onPriceChange = () => {
        this.setState({
            price:+this.priceInput.current.value.trim()
        })
    }


    componentDidMount(){
        let params = new URLSearchParams(window.location.href.split('?')[1]);
        let name = params.get('search');
        if(name){
            instance.get(`/products/filter?search=${name.trim()}&limit=5&page=${this.state.currentPage}`,{headers:{'X-Auth-Token':findToken()}})
            .then(response => {
                document.title = 'List of the Products';
                if(response.data.next){
                    this.setState({
                        foods:response.data.results, 
                        prodName:name
                    })
                }else{
                    this.setState({
                        foods:response.data.results,
                        nextExists:false,
                        prodName:name
                    })
                }
            })
        }else{
            document.title = 'No Product';
            this.setState({
                isEmpty:true
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.currentPage !== this.state.currentPage){
            if(this.state.nextExists){
                instance.get(`/products/filter?search=${this.state.prodName}&limit=5&page=${this.state.currentPage}`,{headers:{'X-Auth-Token':findToken()}})
                .then(response => {
                    document.title = 'List of the Products';
                    if(response.data.next){
                        this.setState({
                            isClicked:false,
                            foods:[ ...this.state.foods,...response.data.results], 
                        })
                    }else{
                        this.setState({
                            isClicked:false,
                            foods:[ ...this.state.foods,...response.data.results], 
                            nextExists:false,
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        isClicked:false,
                        currentPage:this.state.currentPage - 1,
                    })
                    error(err.message || 'Failed. Please Try again')
                })
            }
        }else if(prevState.listStyle !== this.state.listStyle){
            if(this.state.listStyle === 'low_to_expensive'){
                let arr = [...this.state.foods].sort((a,b) => a.price - b.price);
                this.setState({
                    foods:arr
                })
            }else if(this.state.listStyle === 'expensive_to_low'){
                let arr = [...this.state.foods].sort((a,b) => b.price - a.price);
                this.setState({
                    foods:arr
                })
            }
        }
    }



    onScrollHandler = () => {
        if(this.state.nextExists){
            this.setState({
                currentPage:this.state.currentPage + 1,
                isClicked:true
            })
        }
    }

    onSortHandler = (type) => {
            this.setState({
                listStyle:type
            })
        }

    render(){
        let content = <RegSpinner />
        if(this.state.foods){
            let arr = this.state.foods.filter(prod => prod.price <= this.state.price);
            content =   <Fragment>
                 <ProductFilter
                price={this.state.price}
                change={this.onSortHandler}
                changed={this.onPriceChange}
                ref={this.priceInput}
                name={this.state.prodName}
                listStyle={this.state.listStyle}
                />
              <ProductList 
              products={arr}
              />
             {this.state.nextExists && <button 
            onClick={this.onScrollHandler}
            disabled={this.state.isClicked}
            className="Prod--Load">{this.state.isClicked ? "Wait..." : "Load More..."}</button>}
            </Fragment>
           
        }else if(this.state.isEmpty){
          content =   <h1>No Product</h1>
        }
        return (
            <div className="Products">
                <h1>Products List</h1>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user:state.user,
        wishlist:state.wishlist
    }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            getUser:(body) => dispatch(userActions.loginUser(body))
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Products))