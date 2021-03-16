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
        fetchError:false
    }

    componentDidMount(){
        instance.get('/products',{
            headers:{
                'X-Auth-Token': findToken()
            }
        })
        .then(response => {
            document.title = 'Products';
            console.log(response.data)
            this.setState({
                initialProducts:response.data
            })
        })
        .catch(err => {
            document.title = err.message;
            this.setState({
                fetchError:true
            })
        })
    }

    render(){
        let content = <h1 style={{margin:'2rem'}}>Loading...</h1>
       if(this.state.fetchError){
           content = <PageFallback />
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