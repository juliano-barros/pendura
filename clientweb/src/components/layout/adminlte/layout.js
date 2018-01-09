import React from 'react';

export const Loading = (props)=>{

	if ( props.loading ){
		return (
			<div className="overlay">
              <i className="fa fa-refresh fa-spin"></i>
            </div>
        )
	}else{
		return (
			<div>
            </div>
        )

	}


}
export const SectionBody = (props) =>{
    return ( 	
	    <section className="content">
			<div className={`box box-default ${props.boxClasses}`}>
				<div className="box-body">
		  			{props.children}
				</div>
				<Loading loading={props.loading} />
			</div>
    	</section>
    )
}

export const SectionHeader = (props) =>{
    return ( 	
    	<section className="content-header">
      		<h1>
        		{props.main}
    			<small>{props.secondary}</small>
      		</h1>
      		<ol className="breadcrumb">
      			{props.children}
      		</ol>
    	</section>
    )
}

