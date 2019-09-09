import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import Button from "@material-ui/core/Button";
import {DropzoneDialog} from 'material-ui-dropzone'



class ImageDropZone extends Component{
    constructor(props){
        super(props);
        this.state = {
            files: []
        };
    }
    handleChange(files){
        this.setState({
            files: files
        });
        console.log(files);
    }
    clearAll = () => {
        this.setState({files: []})
    };


    render(){
        return (
            <div>
                {/*Defining what are the allowed file types and how many etc*/}
            <DropzoneArea
                onChange={this.handleChange.bind(this)}
                onDrop={this.handleChange.bind(this)}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                maxFileSize={10000000}
                filesLimit={5}
                onDropRejected={this.handleChange.bind(this)}
                getFileLimitExceedMessage={this.handleChange.bind(this)}

            />


            </div>
        )
    }
}

export default ImageDropZone;
/*

<Button size="small" color="default" variant="outlined" onClick={this.clearAll}>
    Clear All
</Button>
<Button size="small" color="default" variant="outlined">
    Sumbit
    </Button>
*/
