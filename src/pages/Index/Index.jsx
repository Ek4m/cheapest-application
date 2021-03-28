import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group';
import RestaurantList from '../../components/RestaurantList/RestaurantList';
import './Index.css';

export class Index extends PureComponent {
    state = {
        imageVisible:false,
        search:'',
    }
    searchInput = React.createRef();
    search = React.createRef();

    componentDidMount(){
        document.title = 'CHEAPEST!!!';
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        if(this.state.search){
            this.props.history.push(`/products?search=${encodeURIComponent(this.state.search.trim())}`);
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            search:this.search.current.value
        })
    }

    onFocusHandler = (e) => {
       if(!this.state.imageVisible){
        this.setState({
            imageVisible:true
        })
       }
    }
    onBlurHandler = (e) => {
        if(this.state.imageVisible){
            this.setState({
                imageVisible:false
            })
           }
    }

    render() {
        return (
                <div className="Index">
                <div className="Index--header">
                <div className="Index--header__content">
            <h1>The   Cheapest  App</h1>
            <p>Whether you're going to do some of your shopping or all of it online, you want the best bargain you can find.This app fits the best for your needs</p>
                           <div className="Index--form">
         <form action="#"
         onSubmit={e => this.onSubmitHandler(e)}
          onFocus={e => this.onFocusHandler(e)}
          onBlur={(e) => this.onBlurHandler(e)}>
                    <div className="form--control">
                        <input type="text" 
                        placeholder="Name of the product"
                        value={this.state.search}
                        ref={this.search}
                        minLength="3"
                        required
                        onChange={e => this.onChangeHandler(e)}
                        />
                    </div>
                    <div className="form--control">
                    <CSSTransition
            in={this.state.imageVisible}
            mountOnEnter
            unmountOnExit
            timeout={200}
            classNames="index--button"
            >
                             <button type="submit">Search now</button> 
                                </CSSTransition>
                    </div>
                </form>
         </div>

        </div>         
        <div className="Index--Header--abs__triangle--bottom"></div>
            </div>
            <RestaurantList />
            </div>
        )
    }
}

export default Index
