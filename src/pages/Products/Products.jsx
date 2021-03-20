import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { findToken, instance } from '../../axios';
import * as userActions from '../../redux/actions/user';
import ProductList from '../../components/Product/ProductList/ProductList';
import PageFallback from '../../ErrorBoundary/PageErrors/PageFallback';
import withAuth from '../../hoc/withAuth'
import './Products.css';
import { connect } from 'react-redux';

class Products extends Component {

    state = {
        initialProducts:[],
        fetchError:false,
        noProductFound:false
    }

    componentDidMount(){
        let params = new URLSearchParams(window.location.href.split('?')[1]);
       let searchParam = params.get('search');
       if(searchParam){
        searchParam = params.get('search').trim();
        instance.get(`/products/filter?search=${searchParam}`,{
            headers:{
                'X-Auth-Token': findToken()
            }
        })
        .then(response => {
            document.title = 'Products';
            console.log(response.data.query.foods)
          if(response.data.query.foods.length > 0){
            this.setState({
                initialProducts:response.data.query.foods
            })
          }else{
              this.setState({
                noProductFound:true
              })
          }
        })
        .catch(err => {
            document.title = err.message;
            this.setState({
                fetchError:true
            })
        })
       }else{
           this.props.history.push('/')
       }
       
    }

    render(){
        let content = <h1 style={{margin:'2rem'}}>Loading...</h1>
       if(this.state.fetchError){
           content = <PageFallback />
       }else if(this.state.noProductFound){
        content = <h1 style={{margin:'2rem'}}>No Product Found:(</h1>
       }else if(this.state.initialProducts.length > 0){
        content = <ProductList products={this.state.initialProducts} />
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
        user:state.user
    }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            getUser:(body) => dispatch(userActions.loginUser(body))
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(withAuth(withRouter(Products)))