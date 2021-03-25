import React, { Component, createRef } from 'react'
import { withRouter } from 'react-router';
import { findToken, instance } from '../../axios';
import * as userActions from '../../redux/actions/user';
import ProductList from '../../components/Product/ProductList/ProductList';
import PageFallback from '../../ErrorBoundary/PageErrors/PageFallback';
import withAuth from '../../hoc/withAuth'
import './Products.css';
import { connect } from 'react-redux';
import RegSpinner from '../../components/RegisterSpinner/RegSpinner';
import ProductFilter from '../../components/Product/ProductFilter/ProductFilter';

class Products extends Component {
    priceInput = createRef();

    state = {
        initialProducts:[],
        usedProducts:[],
        fetchError:false,
        noProductFound:false,
        price:0,
        listStyle:'low_to_expensive',
        page:1,
        next:2,
        nextExist:true
    }

    onPriceChange = () => {
        let price = Number(this.priceInput.current.value);
        let usedArr = [...this.state.initialProducts];
        let newArr = usedArr.filter(prod => prod.price < price);
        this.setState({
            price: this.priceInput.current.value,
            usedProducts:[...newArr]
        })
    }

    onCheckboxChange = (type) => {
       if(type !== this.state.listStyle){
            let usedArray = [...this.state.usedProducts];
            let newArr = usedArray.reverse();
            this.setState({
                listStyle:type,
                usedProducts:newArr
            })      
       }
    }



    loadData = (arg) => {
            let params = new URLSearchParams(window.location.href.split('?')[1]);
        let name = params.get('search');
        if(name){
            name = params.get('search').trim();
            instance.get(`/products/filter?search=${name}&page=${this.state.page}&limit=5`,{
                headers:{
                    'X-Auth-Token': findToken()
                }
            })
            .then(response => {
                document.title = 'Products';
              if(response.data.results.length > 0){
                if(response.data.next){
                 if(arg === 'mount'){
                     console.log('mountdadi')
                    this.setState({
                        initialProducts:response.data.results,
                        usedProducts:response.data.results,
                        nextExist:true
                    })
                 }else{
                    console.log('updatededi')
                    let usedArr = [...this.state.usedProducts, ...response.data.results].filter(prod => prod.price <= this.state.price);
                    if(this.state.listStyle === 'expensive_to_low'){
                        console.log('burdadi')
                        console.log(usedArr)
                        usedArr.sort((a,b) => b.price - a.price)
                    }
                    console.log(usedArr)
                    this.setState({
                        usedProducts: usedArr,
                        nextExist:true
                    })
                 }
                }else{
                    let usedArr = [...this.state.usedProducts, ...response.data.results].filter(prod => prod.price <= this.state.price);
                    if(this.state.listStyle === 'expensive_to_low'){
                        console.log('burdadi')
                        usedArr.sort((a,b) => b.price - a.price)
                    }
                    this.setState({
                        usedProducts:usedArr,
                        nextExist:false
                    })
                }
              }
              
              else{
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

    scrollHandler = () => {        
        if(Math.trunc(document.body.getBoundingClientRect().bottom) === window.innerHeight){
        if(this.state.nextExist){
            this.setState({
                page:this.state.page + 1,
                next:this.state.next + 1,
            })
        }
        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this.scrollHandler);
        this.loadData('mount');
    }

    componentDidUpdate(prevProps, prevState){
      if(prevState.page !== this.state.page){
        if(this.state.nextExist){
        this.loadData('update');
        }
    }
}

componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollHandler);

}

    render(){
        let content = <RegSpinner />
       if(this.state.fetchError){
           content = <PageFallback />
       }else if(this.state.noProductFound){
        content = <h1 style={{margin:'2rem'}}>No Product Found:(</h1>
       }else if(this.state.usedProducts.length > 0){
        content = <ProductList products={this.state.usedProducts} />
    }
        return (
            <div className="Products">
                <h1>Products List</h1>
                <ProductFilter
                price={this.state.price}
                change={this.onCheckboxChange}
                changed={this.onPriceChange}
                ref={this.priceInput}
                listStyle={this.state.listStyle}
                />
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