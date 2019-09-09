import React, { Component } from 'react'
import SingleContent from './SingleContent'
import Grid from '@material-ui/core/Grid'
import { AuthContext } from '../context/Authcontext';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddContent from './AddContent';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Content extends Component {
    state = { content: [], showModal: false, page: 1, isLoading: false }

    componentDidMount() {
        const token = localStorage.getItem("Token")
        this.setState({isLoading: true})
        axios
            .get("https://skpback.herokuapp.com/api/content/?page=0", {
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                this.setState({ content: res.data.content })
                
            }).then(this.setState({ isLoading: false }))
            .catch(err => {
                throw new Error(err.response.data)
            })
            
        window.addEventListener('scroll', this.onScroll, false);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
            && !this.state.isLoading
            && this.state.content.length) {
            this.getPaginatedData();        
        }
    }

    getPaginatedData = () => {
        const token = localStorage.getItem("Token");
        this.setState({isLoading: true})
        axios
            .get("https://skpback.herokuapp.com/api/content/?page="+this.state.page, {
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                this.setState({ content: this.state.content.concat(res.data.content), page: this.state.page + 1 })
                if (res.data.last) {
                    window.removeEventListener('scroll', this.onScroll, false);
                }
            }).then(this.setState({isLoading: false}))
            .catch(err => {
                throw new Error(err.response.data)
            })

    }


    handleClickOpen = () => {
        this.setState({showModal: true})
    };
    handleClose = () => {
        this.setState({ showModal: false })
    };

    postMsg = (data) => {
        this.context.postData("content", data).then(res => {
            this.setState({ showModal: false })
            
        }).then(this.getPaginatedData())
            .catch(err => {
                throw new Error(err.message)
            })
    }

    render() {
            
        return (
            <div>    
            <div style={gridStyle}>
                < Grid
                container
                direction = "row"
                justify = "flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    {this.state.content.length ? this.state.content.map(c => {
                        return <SingleContent key={c.id} post={c}/> 
                    }): < React.Fragment > </React.Fragment> }
                </ Grid>
                <Fab color="primary" aria-label="add" style={btnStyle}>
                    <AddIcon onClick={() => this.setState({ showModal: true })} />
                    </Fab>
                    <AddContent
                        show={this.state.showModal}
                        handleClose={this.handleClose}
                        handleClickOpen={this.handleClickOpen}
                        postMsg={this.postMsg}
                        onHide={() => this.setState({ showModal: false })}/>
                </div>
                {this.state.isLoading ? <CircularProgress /> : null}
            </div>
        )
    }
}
const gridStyle = {
    marginLeft: '50px',
    marginRight: '50px',
    marginTop: '20px'
}

const btnStyle = {
    float: "right",
    position: "fixed",
    bottom: "20px",
    right: "20px"
}

Content.contextType = AuthContext;