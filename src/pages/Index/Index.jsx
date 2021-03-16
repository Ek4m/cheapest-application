import React, { Component
    // Profiler 
} from 'react'
import { CSSTransition } from 'react-transition-group';
import { findToken, instance } from '../../axios';
import RestaurantList from '../../components/RestaurantList/RestaurantList';
import './Index.css';

export class Index extends Component {
    state = {
        imageVisible:false
    }
    searchInput = React.createRef();

    componentDidMount(){
        document.title = 'Welcome to Cheapest App!!!';
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.imageVisible === this.state.imageVisible){
            return false;
        }else{
            return true;
        }
    }

    onFocusHandler = (e) => {
        console.log('salam');
        this.setState({
            imageVisible:true
        })
    }
    onBlurHandler = (e) => {
        console.log('salam');
        this.setState({
            imageVisible:false
        })
    }

    render() {
        console.log('rendered')
        return (
                <div className="Index">
                <div className="Index--header">
                <div className="Index--header__content">
            <h1>The   Cheapest  App</h1>
            <p>Whether you're going to do some of your shopping or all of it online, you want the best bargain you can find.This app fits the best for your needs</p>
                           <div className="Index--form">
         <form action="#"
          onFocus={e => this.onFocusHandler(e)}
          onBlur={(e) => this.onBlurHandler(e)}>
                    <div className="form--control">
                        <input type="text" placeholder="Name of the product"
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
