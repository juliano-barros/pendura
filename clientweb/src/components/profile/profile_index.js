import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { profileRequest, savePhoto } from '../../actions/profile_actions';
import $ from 'jquery';

class ProfileIndex extends Component {

	onSubmit(values){
		
		var formData = new FormData()
		formData.append( 'name', values.name);
		formData.append( 'email', values.email);
		
		if ( values.picture.length > 0 ){
			formData.append( 'picture', values.picture[0], values.picture[0].name);
		 	values = formData;
		}

		this.onSavePhoto(values);

	}


	componentWillUpdate(){
		if ( ( ! this.props.profile.picture) || (this.props.profile.picture === '') ) {
			this.props.profile.picture = `https://dummyimage.com/300x300/AAA/000.gif`;
		}
	}

	componentDidUpdate(){
         $(`#imgPicture`).height( 300 );

	}

 	renderField(field){

	    const { meta: { touched, error } } = field;
	    const className=`form-group ${ touched && error ? 'has-error' : ''} has-feedback`;

 		return( 
  		    <div className={className}>
                  <label >{field.placeholder}</label>
  		    	<input className="form-control" type={field.type} {...field.input} />
        		<div className ="help-block">
          			{ touched ? error : '' }
        		</div>
  		    </div>
		);

 	}

 	onSavePhoto(values){
 		this.props.savePhoto(values);
 	}

 	renderJcrop(field){
  		delete field.input.value; // <-- just delete the value property
  		return <input type="file" id="file" {...field.input} />;
 	}

	loadImageFromClientSide(evt){
		
	    var tgt = evt.target || window.event.srcElement,
	        files = tgt.files;

	    // FileReader support
	    if (FileReader && files && files.length) {
	        var fr = new FileReader();
	        fr.onload = function () {
	            this.props.profile.picture = $("#file").prop("files")[0];
	            $("#imgPicture").attr( 'src', fr.result);
	        }.bind(this)

	        fr.readAsDataURL(files[0]);
	    }

	    // Not supported
	    else {
	    }
	}

	render(){

		const {handleSubmit} = this.props;

		return (

			<div>
			    <section className="content-header">
			      <h1>
			        Profile
			        <small>Profile</small>
			      </h1>
			      <ol className="breadcrumb">
			        <li><i className="fa fa-dashboard"></i> profile</li>
			        <li className="active">profile</li>
			      </ol>
			    </section>
				<div className="row">
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<div className = "col-sm-12">
							<div className="col-sm-6">
							 	<img id="imgPicture"  className="form-control" src={this.props.profile.picture} />
								<Field name="picture" className="form-control" component={this.renderJcrop.bind(this)} onChange={this.loadImageFromClientSide.bind(this)} />
							</div>

							<div className="col-sm-6">
					          	<Field
				            	  name="name"
					              component ={this.renderField}
					              type="text"
					              placeholder="Nome"
					            />
					          	<Field
				            	  name="email"
					              component ={this.renderField}
					              type="text"
					              placeholder="E-mail"
					            />
							</div>
				            <button type="submit" className="btn btn-primary pull-right"> Salvar </button>
						</div>
					</form>
				</div>
			</div>

		)
	}
}

function mapStateToProps({profile}){
	return { profile, enableReinitialize: true, initialValues: profile };	
}

function validate(values){

	const errors ={};

	return errors;
}

ProfileIndex = reduxForm({	
	validate, 
	form: 'profile_form_index'
})(ProfileIndex) 

ProfileIndex = connect(mapStateToProps, {profileRequest, savePhoto})(ProfileIndex)

export default ProfileIndex;
//{this.renderJcrop.bind(this)}




