import React, {Component} from 'react';
import _ from 'lodash';
import $ from 'jquery';
import { loadJCrop } from './jcrop';
import { reduxForm, Field } from 'redux-form';


class JCrop extends Component{
	

	componentWillMount(){
		this.setState( _.defaults( this.props, {} ) );
		this.setState({btnCrop:'btnCrop', btnSave: 'btnSave'})

		if ( this.props.file === '' ){
			this.setState( {file : `https://dummyimage.com/${this.props.width}x${this.props.height}/${this.props.colorBackGround}/${this.props.colorForeGround}.gif`})	
		}

	}

	componentDidMount(){
		loadJCrop($);

		$(`#${this.props.name}`).width(this.props.width);
		$(`#${this.props.name}`).height(this.props.height);
		this.loadCropImage();
		
	}

	loadCropImage(){
		$(`#${this.props.name}`).Jcrop();
		this.setState( { _jcrop: $(`#${this.props.name}`).data('Jcrop') } );
		$(`#${this.state.btnCrop}`).disabled = true;

	}

	destroyCropImage(){
		this.state._jcrop.destroy();
		$('.imagePreviewLarge').removeAttr('style');
	}

	loadImageFromClientSide(evt){
		
	    var tgt = evt.target || window.event.srcElement,
	        files = tgt.files;

	    // FileReader support
	    if (FileReader && files && files.length) {
	        var fr = new FileReader();
	        fr.onload = function () {
	            this.setState({file: fr.result} );
	            this.state._jcrop.setImage(fr.result);
	            this.destroyCropImage();

	        }.bind(this)

	        fr.readAsDataURL(files[0]);
	    }

	    // Not supported
	    else {
	    }
	}

	onSubmit(values){
		this.props.savePhoto(values);
	}

	onRenderCrop(field){
		return(
			<div>
				<input type="file" {...field.input} />
			</div>
		)
	}

	render(){
		const {handleSubmit} = this.props;
		return(

			<div className='pull-center'>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<div className="col-sm-12">
						<img src={this.state.file} id={this.state.name} value={this.state.file} />
					</div>
	                <div className="form-group col-sm-12">
		                <div className="form-group col-sm-12">
	                  		<label htmlFor={this.state.idInputFile}>{this.state.labelInputFile}</label>
	                  		<Field name="imgProfile" component="input" type="file"/>
		                </div>
		                <div className="form-group col-sm-12">
	                  		<button type="button" className="btn btn-success" id={this.state.btnCrop} onClick={this.loadCropImage.bind(this)}>Crop</button>
	                  		<button type="submit" className="btn btn-primary pull-right">Save</button>
		                </div>
	                </div>
	            </form>
			</div>

		)
	}


}

JCrop.defaultProps = {
	file: '',
	name: 'emptyImage',
	width: 150,
	height: 150,
	colorBackGround: 'AAA',
	colorForeGround: 'FFF',
	labelInputFile: 'Selecione a imagem',
	idInputFile: 'inputFile',
	savePhoto: ()=>{}
};

JCrop = reduxForm({
	form: 'formCropProfile'
})(JCrop)

export default JCrop;